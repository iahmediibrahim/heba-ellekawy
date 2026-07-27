"use client";

import { useState } from "react";

const emailStrings = {
  namePlaceholder: "ألاسم",
  emailPlaceholder: "البريد الالكتروني",
  messagePlaceholder: "الرساله",
  submitText: "أرسال",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          className="input-field"
          placeholder={emailStrings.namePlaceholder}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          className="input-field"
          placeholder={emailStrings.emailPlaceholder}
        />
      </div>
      <div>
        <textarea
          name="message"
          id="message"
          rows={10}
          className="input-field min-h-52"
          placeholder={emailStrings.messagePlaceholder}
        />
      </div>
      <div className="text-center">
        {status === "success" ? (
          <p className="font-semibold text-emerald-600">تم إرسال رسالتك بنجاح.</p>
        ) : (
          <button type="submit" className="primary-button">
            {emailStrings.submitText}
          </button>
        )}
      </div>
      {status === "error" ? (
        <p className="text-center text-sm text-red-600">حدث خطأ أثناء الإرسال. برجاء المحاولة مرة أخرى.</p>
      ) : null}
    </form>
  );
}
