import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { getAboutData } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

const headingFont = Noto_Kufi_Arabic({
  variable: "--font-heading",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const bodyFont = Noto_Naskh_Arabic({
  variable: "--font-body",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  ...buildMetadata(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const about = await getAboutData();

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full text-slate-900">
        <div className="relative isolate flex min-h-full flex-col overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(244,214,227,0.95),rgba(252,248,248,0)_68%)]" />
          <div className="pointer-events-none absolute -left-24 top-[24rem] -z-10 h-72 w-72 rounded-full bg-[rgba(238,220,232,0.55)] blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-[7rem] -z-10 h-80 w-80 rounded-full bg-[rgba(244,232,214,0.4)] blur-3xl" />
          <SiteShell about={about}>{children}</SiteShell>
        </div>
      </body>
    </html>
  );
}
