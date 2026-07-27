"use client";

import Script from "next/script";

export function FacebookPageEmbed({ link }: { link: string }) {
  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="mb-6 text-right">
        <p className="eyebrow">المجتمع</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">تابعنا على فيسبوك</h2>
      </div>
      <div id="fb-root" />
      <div
        className="fb-page"
        data-href={link}
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote cite={link} className="fb-xfbml-parse-ignore">
          <a href={link}>Shaghbatta</a>
        </blockquote>
      </div>
      <Script
        id="facebook-page-sdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v19.0"
      />
    </section>
  );
}
