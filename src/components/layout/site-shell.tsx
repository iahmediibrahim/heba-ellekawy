import { Footer } from "@/components/layout/footer"
import { MessengerChat } from "@/components/layout/messenger-chat"
import { Navigation } from "@/components/layout/navigation"
import { ScrollToTop } from "@/components/layout/scroll-to-top"
import type { AboutData } from "@/lib/types"

export function SiteShell({
  about,
  children,
}: Readonly<{
  about: AboutData | null
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      <ScrollToTop />
      <main id="main-content" className="min-h-screen flex-1">
        {children}
      </main>
      <MessengerChat />
      <Footer about={about} />
    </>
  )
}
