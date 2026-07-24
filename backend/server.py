from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend) — base URL is a CONSTANT (survives deployment)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------------- Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""  # which company / area of interest
    message: str


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    company: str = ""
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------------- Email helpers ----------------
async def _send_email(recipient: str, subject: str, html: str, reply_to: Optional[str] = None):
    payload = {
        "to": [recipient],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    if reply_to:
        payload["contact_email"] = reply_to
    async with httpx.AsyncClient(timeout=30) as c:
        resp = await c.post(f"{EMAIL_BASE_URL}/api/v1/email/send",
                            headers={"X-Email-Key": EMAIL_KEY}, json=payload)
    resp.raise_for_status()
    return resp.json().get("id")


def _owner_html(e: EnquiryCreate) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f6f6f4;padding:32px">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">
          <tr><td style="background:#111111;padding:28px 32px">
            <div style="color:#D4AF37;font-size:12px;letter-spacing:3px;text-transform:uppercase">Kailash Group</div>
            <div style="color:#ffffff;font-size:22px;margin-top:6px">New Website Enquiry</div>
          </td></tr>
          <tr><td style="padding:28px 32px;color:#222">
            <p style="margin:0 0 16px;color:#555">You've received a new enquiry from the website.</p>
            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:15px">
              <tr><td style="color:#888;width:120px">Name</td><td style="color:#111"><strong>{e.name}</strong></td></tr>
              <tr><td style="color:#888">Email</td><td style="color:#111">{e.email}</td></tr>
              <tr><td style="color:#888">Phone</td><td style="color:#111">{e.phone or '-'}</td></tr>
              <tr><td style="color:#888">Interest</td><td style="color:#111">{e.company or '-'}</td></tr>
              <tr><td style="color:#888;vertical-align:top">Message</td><td style="color:#111">{e.message}</td></tr>
            </table>
          </td></tr>
          <tr><td style="background:#faf7ef;padding:18px 32px;color:#8a7a3a;font-size:12px">
            Reply directly to this email to respond to {e.name}.
          </td></tr>
        </table>
      </td></tr>
    </table>"""


def _client_html(e: EnquiryCreate) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f6f6f4;padding:32px">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">
          <tr><td style="background:#111111;padding:28px 32px">
            <div style="color:#D4AF37;font-size:12px;letter-spacing:3px;text-transform:uppercase">Kailash Group</div>
            <div style="color:#ffffff;font-size:22px;margin-top:6px">Thank you, {e.name}</div>
          </td></tr>
          <tr><td style="padding:28px 32px;color:#333;font-size:15px;line-height:1.6">
            <p>We've received your enquiry and a member of our team will be in touch shortly.</p>
            <p>At Kailash Group, legal expertise meets property investment and development — delivering trusted solutions across Australia.</p>
            <p style="margin-top:24px;color:#888;font-size:13px">Warm regards,<br/>The Kailash Group Team<br/>Parramatta, NSW &middot; 02 9633 4233</p>
          </td></tr>
        </table>
      </td></tr>
    </table>"""


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Kailash Group API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c['timestamp'], str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return checks


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(**payload.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())

    # Fire emails; storing succeeds even if email provider hiccups
    try:
        await _send_email(OWNER_EMAIL, f"New Enquiry — {payload.name}",
                          _owner_html(payload), reply_to=payload.email)
    except Exception as ex:
        logger.error(f"Owner email failed: {ex}")
    try:
        await _send_email(payload.email, "We've received your enquiry — Kailash Group",
                          _client_html(payload))
    except Exception as ex:
        logger.error(f"Client email failed: {ex}")

    return enquiry


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    items = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
