import { LuMessageCircle } from "react-icons/lu"

export function MessengerChat() {
  return (
    <a
      href="https://m.me/213414642507674"
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر ماسنجر"
      title="تواصل عبر ماسنجر"
      className="primary-button fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full p-0! sm:bottom-6 sm:right-6"
    >
      <LuMessageCircle className="size-6" aria-hidden="true" />
    </a>
  )
}
