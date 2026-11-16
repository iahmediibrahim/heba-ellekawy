import type { Metadata } from "next"
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css"
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css"
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css"
import "@fontsource/ibm-plex-sans-arabic/arabic-700.css"
import "@fontsource/ibm-plex-sans-arabic/latin-400.css"
import "@fontsource/ibm-plex-sans-arabic/latin-500.css"
import "@fontsource/ibm-plex-sans-arabic/latin-600.css"
import "@fontsource/ibm-plex-sans-arabic/latin-700.css"
import "./globals.css"
import { SiteShell } from "@/components/layout/site-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { brand, siteTitle } from "@/lib/brand"
import { getAboutData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"
import { getSiteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  ...buildMetadata(),
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const about = await getAboutData()
  const siteUrl = getSiteUrl()

  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full text-slate-900">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: siteTitle,
            url: siteUrl,
            inLanguage: "ar-EG",
            publisher: {
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: brand.name,
              url: siteUrl,
              jobTitle: brand.roleAr,
            },
          }}
        />
        <div className="relative isolate flex min-h-full flex-col overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(43,178,230,0.28),rgba(252,253,255,0)_70%)]" />
          <div className="pointer-events-none absolute -left-24 top-[26rem] -z-10 h-72 w-72 rounded-full bg-[rgba(41,170,225,0.16)] blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-[9rem] -z-10 h-80 w-80 rounded-full bg-[rgba(39,126,225,0.14)] blur-3xl" />
          <SiteShell about={about}>{children}</SiteShell>
        </div>
      </body>
    </html>
  )
}
