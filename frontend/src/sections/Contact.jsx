import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { CONTACT, COMPANIES } from "../lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Thank you — your enquiry has been sent. We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-white/60 border border-[#e6e3da] rounded-xl px-4 py-3.5 text-[#111] placeholder-[#9a9a9a] outline-none focus:border-champagne focus:bg-white transition-colors";

  return (
    <section id="contact" data-testid="contact-section" className="relative z-10 bg-white py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <Reveal className="max-w-2xl mb-16">
          <div className="overline mb-5">Get in Touch</div>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111] leading-[1.02]">
            Let&apos;s transform your <span className="italic font-accent text-champagne">vision</span> into value.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form panel */}
          <Reveal className="glass rounded-3xl p-8 sm:p-10">
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <input data-testid="contact-name" className={inputCls} placeholder="Full name *" value={form.name} onChange={set("name")} />
                <input data-testid="contact-email" type="email" className={inputCls} placeholder="Email address *" value={form.email} onChange={set("email")} />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input data-testid="contact-phone" className={inputCls} placeholder="Phone" value={form.phone} onChange={set("phone")} />
                <select data-testid="contact-company" className={inputCls} value={form.company} onChange={set("company")}>
                  <option value="">Area of interest</option>
                  {COMPANIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  <option value="General">General enquiry</option>
                </select>
              </div>
              <textarea data-testid="contact-message" rows={5} className={inputCls + " resize-none"} placeholder="How can we help? *" value={form.message} onChange={set("message")} />
              <button data-testid="contact-submit" type="submit" disabled={loading} className="btn-gold px-8 py-4 text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <>Send Enquiry <Send size={16} /></>}
              </button>
            </form>
          </Reveal>

          {/* Details + Map */}
          <Reveal delay={0.15} className="flex flex-col gap-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { Icon: Phone, label: "Call", val: CONTACT.phone, href: `tel:${CONTACT.phone}` },
                { Icon: Mail, label: "Email", val: CONTACT.email, href: `mailto:${CONTACT.email}` },
                { Icon: MapPin, label: "Visit", val: "Parramatta, NSW", href: "#" },
              ].map(({ Icon, label, val, href }) => (
                <a key={label} href={href} className="glass rounded-2xl p-5 hover:-translate-y-1 transition-transform block">
                  <Icon className="text-champagne mb-3" size={20} />
                  <div className="overline text-[0.6rem] mb-1">{label}</div>
                  <div className="text-sm text-[#111] break-words">{val}</div>
                </a>
              ))}
            </div>
            <div className="rounded-3xl overflow-hidden border border-[#e6e3da] flex-1 min-h-[320px] glass p-2">
              <iframe
                title="Kailash Group — Parramatta NSW"
                data-testid="contact-map"
                src={CONTACT.mapEmbed}
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
