import {
  Facebook,
  Linkedin,
  MessageCircleMore,
  MessagesSquare,
  Twitter,
} from "lucide-react"

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const sharedClassName = "secondary-button px-4 py-3 text-sm"
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const links = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="size-4" aria-hidden="true" />,
    },
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter className="size-4" aria-hidden="true" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="size-4" aria-hidden="true" />,
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: <MessagesSquare className="size-4" aria-hidden="true" />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      icon: <MessageCircleMore className="size-4" aria-hidden="true" />,
    },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={sharedClassName}
        >
          {icon}
          {label}
        </a>
      ))}
    </div>
  )
}
