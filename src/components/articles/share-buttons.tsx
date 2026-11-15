"use client"

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import {
  Facebook,
  Linkedin,
  MessageCircleMore,
  MessagesSquare,
  Twitter,
} from "lucide-react"

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const sharedClassName = "secondary-button px-4 py-3 text-sm"

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <FacebookShareButton
        url={url}
        title={title}
        resetButtonStyle={false}
        className={sharedClassName}
      >
        <Facebook className="size-4" />
        Facebook
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        title={title}
        resetButtonStyle={false}
        className={sharedClassName}
      >
        <Twitter className="size-4" />
        Twitter
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        resetButtonStyle={false}
        className={sharedClassName}
      >
        <Linkedin className="size-4" />
        LinkedIn
      </LinkedinShareButton>
      <RedditShareButton
        url={url}
        title={title}
        resetButtonStyle={false}
        className={sharedClassName}
      >
        <MessagesSquare className="size-4" />
        Reddit
      </RedditShareButton>
      <WhatsappShareButton
        url={url}
        title={title}
        resetButtonStyle={false}
        className={sharedClassName}
      >
        <MessageCircleMore className="size-4" />
        WhatsApp
      </WhatsappShareButton>
    </div>
  )
}
