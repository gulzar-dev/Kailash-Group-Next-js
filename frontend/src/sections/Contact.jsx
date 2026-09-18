"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { CONTACT, COMPANIES } from "../lib/data";

export const Contact = ({ data, siteSettings, ...props }) => {
  const contact = {
    phone: siteSettings?.phone || CONTACT.phone,
    phoneIntl: siteSettings?.phoneIntl || CONTACT.phoneIntl,
    email: siteSettings?.email || CONTACT.email,
    address: siteSettings?.address || CONTACT.address,
    addressParts: siteSettings?.addressParts || CONTACT.addressParts,
    mapUrl: siteSettings?.mapUrl || CONTACT.mapUrl,
    mapEmbed: siteSettings?.mapEmbed || CONTACT.mapEmbed,
  };
  const companies = siteSettings?.companies || COMPANIES;
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | success | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setLoading(true);
    setStatus("idle");
    try {
      await axios.post("/api/enquiry", {
        ...form,
        page: typeof window !== "undefined" ? window.location.pathname : "/",
      });
      setStatus("success");
      toast.success("Thank you, your enquiry has been sent. We'll be in touch shortly.");
      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "enquiry_submitted" });
      }
      setForm({ name: "", email: "", phone: "", company: "", message: "", website: "" });
    } catch (err) {
      setStatus("error");
      toast.error("Something went wrong. Please try again or call us on 02 9633 4233.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/60 border border-[#D9E1EC] rounded-xl px-4 py-3.5 text-[#0A2540] placeholder-[#94A3B8] outline-none focus:border-champagne focus:bg-white transition-colors";

  return (
    <section id="contact" data-testid="contact-section" className="relative z-10 bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <Reveal className="max-w-2xl mb-10">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
            {data?.heading || "Reach out "}<span className="italic font-accent text-champagne">{data?.headingAccent || "to us."}</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form panel */}
          <Reveal className="glass rounded-3xl p-8 sm:p-10">
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              {/* Honeypot: hidden from real visitors, left blank by them; bots often fill it */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={set("website")}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                data-testid="contact-honeypot"
                style={{ position: "absolute", left: "-9999px", width: 0, height: 0, opacity: 0 }}
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <input data-testid="contact-name" className={inputCls} placeholder="Full name *" value={form.name} onChange={set("name")} />
                <input data-testid="contact-email" type="email" className={inputCls} placeholder="Email address *" value={form.email} onChange={set("email")} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input data-testid="contact-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={set("phone")} />
                <select data-testid="contact-company" className={inputCls} value={form.company} onChange={set("company")}>
                  <option value="">Area of interest</option>
                  {companies.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  <option value="General">General enquiry</option>
                </select>
              </div>
              <textarea data-testid="contact-message" rows={5} className={inputCls + " resize-none"} placeholder="How can we help? *" value={form.message} onChange={set("message")} />
              <button data-testid="contact-submit" type="submit" disabled={loading} className="btn-gold px-8 py-4 text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send Enquiry <Send size={16} /></>}
              </button>
              {status === "success" && (
                <p data-testid="contact-success-message" className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <CheckCircle2 size={16} /> Thank you — your enquiry has been received. We'll be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p data-testid="contact-error-message" className="flex items-center gap-2 text-sm text-red-500 font-medium">
                  <AlertCircle size={16} /> Something went wrong. Please call us on 02 9633 4233.
                </p>
              )}
            </form>
          </Reveal>

          {/* Details + Map */}
          <Reveal delay={0.15} className="flex flex-col gap-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { Icon: Phone, label: "Call", val: contact.phone, href: `tel:${contact.phone}` },
                { Icon: Mail, label: "Email", val: contact.email, href: `mailto:${contact.email}` },
                { Icon: MapPin, label: "Visit", val: "Parramatta, NSW", href: contact.mapUrl },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="glass rounded-2xl p-5 hover:-translate-y-1 transition-transform block">
                  <Icon className="text-champagne mb-3" size={20} />
                  <div className="overline text-[0.6rem] mb-1">{label}</div>
                  <div className="text-sm text-[#0A2540] break-words">{val}</div>
                </a>
              ))}
            </div>
            <div className="rounded-3xl overflow-hidden border border-[#D9E1EC] flex-1 min-h-[320px] glass p-2">
              <iframe
                title="Kailash Group, Parramatta NSW"
                data-testid="contact-map"
                src={contact.mapEmbed}
                className="w-full h-full min-h-[300px] rounded-2xl"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};