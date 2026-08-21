"""Backend API tests for Kailash Group site (health, status, enquiries)."""
import os
import uuid

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = (
    os.environ.get("REACT_APP_BACKEND_URL")
    or frontend_env.get("NEXT_PUBLIC_BACKEND_URL")
    or frontend_env.get("REACT_APP_BACKEND_URL")
)
if not base_url:
    raise RuntimeError("Backend URL missing from env and /app/frontend/.env")
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health ----------------
class TestHealth:
    def test_api_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200, r.text[:300]
        assert r.json().get("message") == "Kailash Group API"


# ---------------- Status checks ----------------
class TestStatus:
    def test_create_and_list_status(self, api_client):
        name = f"TEST_{uuid.uuid4().hex[:8]}"
        r = api_client.post(f"{BASE_URL}/api/status", json={"client_name": name}, timeout=30)
        assert r.status_code == 200, r.text[:300]
        data = r.json()
        assert data["client_name"] == name
        assert isinstance(data["id"], str) and len(data["id"]) > 0
        assert "timestamp" in data
        assert "_id" not in data

        g = api_client.get(f"{BASE_URL}/api/status", timeout=30)
        assert g.status_code == 200
        items = g.json()
        assert isinstance(items, list)
        assert any(i["client_name"] == name for i in items), "created status not persisted"
        assert all("_id" not in i for i in items)

    def test_create_status_validation(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/status", json={}, timeout=30)
        assert r.status_code == 422


# ---------------- Enquiries (contact form) ----------------
class TestEnquiries:
    def test_create_enquiry_and_persist(self, api_client):
        marker = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_QA_{marker}",
            "email": "delivered@resend.dev",
            "phone": "0400000000",
            "company": "Koala Invest",
            "message": f"TEST message {marker}",
        }
        r = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=90)
        assert r.status_code == 200, r.text[:500]
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert data["company"] == payload["company"]
        assert isinstance(data["id"], str)
        assert "created_at" in data
        assert "_id" not in data

        g = api_client.get(f"{BASE_URL}/api/enquiries", timeout=30)
        assert g.status_code == 200
        items = g.json()
        assert isinstance(items, list)
        match = [i for i in items if i["id"] == data["id"]]
        assert match, "enquiry not persisted / not returned by GET"
        assert match[0]["message"] == payload["message"]
        assert all("_id" not in i for i in items)

    def test_enquiry_optional_fields(self, api_client):
        marker = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_MIN_{marker}",
            "email": "delivered@resend.dev",
            "message": "TEST minimal payload",
        }
        r = api_client.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=90)
        assert r.status_code == 200, r.text[:500]
        data = r.json()
        assert data["phone"] == ""
        assert data["company"] == ""

    def test_enquiry_invalid_email(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/enquiries",
            json={"name": "TEST", "email": "not-an-email", "message": "x"},
            timeout=30,
        )
        assert r.status_code == 422, r.text[:300]

    def test_enquiry_missing_fields(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/enquiries", json={"name": "TEST"}, timeout=30)
        assert r.status_code == 422

    def test_unknown_api_route_404(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/does-not-exist", timeout=30)
        assert r.status_code == 404


# ---------------- Frontend route reachability (SSR / Next routing) ----------------
class TestFrontendRoutes:
    @pytest.mark.parametrize(
        "path",
        [
            "/",
            "/about",
            "/awards",
            "/company/kailash-lawyers",
            "/company/koala-invest",
            "/company/kuber-projects",
            "/legal/privacy",
            "/legal/disclaimer",
            "/legal/acknowledgement",
        ],
    )
    def test_route_200(self, api_client, path):
        r = requests.get(f"{BASE_URL}{path}", timeout=60)
        assert r.status_code == 200, f"{path} -> {r.status_code}"

    # New static assets added for awards/about/ecosystem
    @pytest.mark.parametrize(
        "asset",
        ["/logo-white-stack.png", "/dhawal-amlani.jpeg", "/sumeet-gupta.jpeg", "/awards-group.webp", "/amit-pall.jpeg"],
    )
    def test_static_assets_200(self, asset):
        r = requests.get(f"{BASE_URL}{asset}", timeout=60)
        assert r.status_code == 200, f"{asset} -> {r.status_code}"

    # Legal pages must render the correct h1 title
    @pytest.mark.parametrize(
        "path,title",
        [
            ("/legal/privacy", "Privacy Policy"),
            ("/legal/disclaimer", "Disclaimer"),
            ("/legal/acknowledgement", "Acknowledgement of Country"),
        ],
    )
    def test_legal_page_title(self, path, title):
        r = requests.get(f"{BASE_URL}{path}", timeout=60)
        assert r.status_code == 200
        assert title in r.text, f"{path} missing title {title}"

    def test_legal_unknown_slug_404(self):
        r = requests.get(f"{BASE_URL}/legal/nope-qa", timeout=60)
        assert r.status_code == 404, f"expected 404, got {r.status_code}"

    def test_awards_page_content(self):
        r = requests.get(f"{BASE_URL}/awards", timeout=60)
        assert r.status_code == 200
        for token in ["awards-page", "awards-group.webp", "certificate-appreciation",
                      "Woh Lamhe Musical", "Bandeesh Group", "PropertyGuru",
                      "Specifically identified", "Koala Invest", "Kuber Projects"]:
            assert token in r.text, f"/awards missing '{token}'"

    def test_about_page_team_photos(self):
        r = requests.get(f"{BASE_URL}/about", timeout=60)
        assert r.status_code == 200
        for token in ["about-page", "/amit-pall.jpeg", "/dhawal-amlani.jpeg", "/sumeet-gupta.jpeg"]:
            assert token in r.text, f"/about missing '{token}'"
        assert "Portrait coming soon" not in r.text

    @pytest.mark.parametrize(
        "slug,website",
        [
            ("kailash-lawyers", "https://www.kailash.com.au/"),
            ("koala-invest", "https://koalainvest.com.au/"),
            ("kuber-projects", "https://kuberprojects.com.au/"),
        ],
    )
    def test_company_visit_website(self, slug, website):
        r = requests.get(f"{BASE_URL}/company/{slug}", timeout=60)
        assert r.status_code == 200
        assert "company-visit-website" in r.text
        assert website in r.text, f"{slug} missing website {website}"

    def test_home_new_sections(self):
        r = requests.get(f"{BASE_URL}/", timeout=60)
        assert r.status_code == 200
        for token in ["linkedin-section", "linkedin-post-0", "linkedin-post-1", "linkedin-post-2",
                      "linkedin-follow-btn", "logo-white-stack.png", "footer-privacy",
                      "footer-disclaimer", "footer-acknowledgement", "Reach out"]:
            assert token in r.text, f"home missing '{token}'"
        assert "KAILASH • GROUP" not in r.text

    def test_unknown_route_returns_404(self, api_client):
        r = requests.get(f"{BASE_URL}/does-not-exist-qa", timeout=60)
        assert r.status_code == 404, f"expected 404, got {r.status_code}"
        assert "Back to Kailash Group" in r.text

    def test_unknown_company_slug_404(self, api_client):
        r = requests.get(f"{BASE_URL}/company/not-a-company", timeout=60)
        assert r.status_code == 404, f"expected 404, got {r.status_code}"
