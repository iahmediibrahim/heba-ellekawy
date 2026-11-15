"use client";

import { useState } from "react";

const labels = {
  name: "الاسم",
  email: "البريد الإلكتروني",
  message: "الرسالة",
  submit: "إرسال",
  namePlaceholder: "اكتب اسمك بالكامل",
  emailPlaceholder: "name@example.com",
  messagePlaceholder: "اكتب رسالتك هنا...",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("pending");

    try {
      const response = await fetch("https://formspree.io/f/mpzobndz", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === "pending"}>
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-slate-800">
          {labels.name}
        </label>
        <input
          type="text"
          name="name"
          id="contact-name"
          required
          autoComplete="name"
          className="input-field"
          placeholder={labels.namePlaceholder}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-slate-800">
          {labels.email}
        </label>
        <input
          type="email"
          name="email"
          id="contact-email"
          required
          autoComplete="email"
          dir="ltr"
          className="input-field text-left"
          placeholder={labels.emailPlaceholder}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-800">
          {labels.message}
        </label>
        <textarea
          name="message"
          id="contact-message"
          rows={5}
          required
          className="input-field min-h-44"
          placeholder={labels.messagePlaceholder}
        />
      </div>

      <div className="text-center" aria-live="polite">
        {status === "success" ? (
          <p className="font-semibold text-emerald-600">تم إرسال رسالتك بنجاح.</p>
        ) : (
          <button type="submit" className="primary-button" disabled={status === "pending"}>
            {status === "pending" ? "جارٍ الإرسال..." : labels.submit}
          </button>
        )}
      </div>

      {status === "error" ? (
        <p className="text-center text-sm text-red-600" role="alert">
          حدث خطأ أثناء الإرسال. برجاء المحاولة مرة أخرى.
        </p>
      ) : null}
    </form>
  );
}
