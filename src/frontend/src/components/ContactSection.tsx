import { Loader2, Mail, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const submit = useSubmitContactForm();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit.mutateAsync(form);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  const inputStyle = {
    background: "oklch(0.13 0.009 220)",
    border: "1px solid oklch(0.28 0.015 220)",
    color: "oklch(0.95 0.005 220)",
    borderRadius: "0.5rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    fontSize: "0.875rem",
  };

  return (
    <section
      id="contact"
      className="py-20"
      style={{ background: "oklch(0.14 0.009 220)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-teal mb-3">
              Reach Out
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-wide mb-4">
              Get In Touch
            </h3>
            <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
              Have questions? Reach out directly to
            </p>
            <p
              className="text-2xl mb-8 text-teal"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
              }}
            >
              Rahul Raja Khakha
            </p>

            <div className="space-y-4">
              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.16 0.01 220)",
                  border: "1px solid oklch(0.25 0.015 220)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.78 0.14 192 / 0.1)",
                    border: "1px solid oklch(0.78 0.14 192 / 0.25)",
                  }}
                >
                  <Mail className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    rahul@trendselectronics.in
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "oklch(0.16 0.01 220)",
                  border: "1px solid oklch(0.25 0.015 220)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "oklch(0.78 0.14 192 / 0.1)",
                    border: "1px solid oklch(0.78 0.14 192 / 0.25)",
                  }}
                >
                  <Phone className="h-4 w-4 text-teal" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                    Phone
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    +91 98765 43210
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "oklch(0.16 0.01 220)",
                border: "1px solid oklch(0.25 0.015 220)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              <h3 className="text-xl font-bold text-foreground mb-1">
                Send a Message
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Get in touch with{" "}
                <span
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.1rem",
                    color: "oklch(0.78 0.14 192)",
                    fontWeight: 700,
                  }}
                >
                  Rahul Raja Khakha
                </span>
              </p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      style={inputStyle}
                      data-ocid="contact.name.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX"
                      style={inputStyle}
                      data-ocid="contact.phone.input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    type="email"
                    required
                    style={inputStyle}
                    data-ocid="contact.email.input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-muted-foreground uppercase tracking-wider mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    rows={4}
                    style={{ ...inputStyle, resize: "none" }}
                    data-ocid="contact.message.textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submit.isPending}
                  data-ocid="contact.submit_button"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide uppercase transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: "oklch(0.78 0.14 192)",
                    color: "oklch(0.1 0.01 220)",
                    boxShadow: "0 0 20px oklch(0.78 0.14 192 / 0.3)",
                  }}
                >
                  {submit.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {submit.isPending ? "Sending..." : "Send Message"}
                </button>

                {submit.isSuccess && (
                  <p
                    className="text-center text-sm text-teal"
                    data-ocid="contact.success_state"
                  >
                    ✓ Message sent! Rahul Raja Khakha will respond shortly.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
