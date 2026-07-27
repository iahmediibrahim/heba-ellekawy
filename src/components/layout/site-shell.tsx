import { Footer } from "@/components/layout/footer";
import { MessengerChat } from "@/components/layout/messenger-chat";
import { Navigation } from "@/components/layout/navigation";
import type { AboutData } from "@/lib/types";

export function SiteShell({
  about,
  children,
}: Readonly<{
  about: AboutData;
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation about={about} />
      <main className="min-h-screen flex-1">{children}</main>
      <MessengerChat />
      <Footer about={about} />
    </>
  );
}
