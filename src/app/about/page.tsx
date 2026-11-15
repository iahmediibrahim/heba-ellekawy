import type { Metadata } from "next"
import Image from "next/image"

import { ServicesSection } from "@/components/sections/services-section"
import { Section } from "@/components/ui/section"
import { getAboutData } from "@/lib/contentful"
import { buildMetadata } from "@/lib/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData()

  return buildMetadata({
    title: "عن المنصة وخدماتها",
    description: about.description,
    keywords: ["الخدمات", "الاستشارات النفسية", "ورش الكتابة"],
    path: "/about",
    image: about.image
      ? {
          src: about.image.url,
          width: about.image.width,
          height: about.image.height,
        }
      : undefined,
  })
}

export default async function AboutPage() {
  const about = await getAboutData()

  return (
    <div className="page-shell">
      <Section className="gap-0">
        <div className="grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] lg:grid-cols-2">
          <div className="brand-panel order-2 flex flex-col justify-between gap-8 p-6 sm:p-8 lg:order-1 lg:p-10">
            <div className="space-y-5">
              <p className="brand-eyebrow">من نحن</p>
              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                عن المنصة وخدماتها
              </h1>
              <p className="text-base leading-8 text-white/85">{about.description}</p>
            </div>
            <Image
              src="/images/signature.png"
              alt="توقيع هبة اللكاوي"
              width={150}
              height={60}
              className="w-[130px] brightness-0 invert"
            />
          </div>
          <div className="relative order-1 aspect-[4/3] bg-[var(--surface-muted)] lg:order-2 lg:aspect-auto lg:min-h-[36rem]">
            {about.image ? (
              <Image
                src={about.image.url}
                alt={about.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center p-8 text-center text-[var(--text-muted)]">
                عن المنصة وخدماتها
              </div>
            )}
          </div>
        </div>
      </Section>

      <ServicesSection services={about.services} />
    </div>
  )
}
