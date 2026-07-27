"use client"

import Script from "next/script"

export function MessengerChat() {
  return (
    <>
      <div id="fb-root" />
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div class="fb-customerchat" attribution="biz_inbox" page_id="213414642507674"></div>',
        }}
      />
      <Script
        id="messenger-chat-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.fbAsyncInit = function () {
              if (!window.FB) return;
              window.FB.init({
                appId: '4390895540950487',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v19.0'
              });
            };
          `,
        }}
      />
      <Script
        id="messenger-chat-sdk"
        strategy="afterInteractive"
        src="https://connect.facebook.net/ar_AR/sdk/xfbml.customerchat.js"
      />
    </>
  )
}
