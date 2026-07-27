import type { Metadata } from "next";
import Image from "next/image";

import { ServicesSection } from "@/components/home/services-section";
import { getAboutData } from "@/lib/contentful";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutData();

  return buildMetadata({
    title: about.title,
    description: about.description,
    keywords: ["about", "services", "شغبطه"],
    image: about.image
      ? {
          src: about.image.url,
          width: about.image.width,
          height: about.image.height,
        }
      : undefined,
  });
}

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <div className="page-shell">
      <section className="section-stack">
        <div className="section-heading" data-align="center">
          <p className="eyebrow">من نحن</p>
          <h1 className="section-title">{about.title}</h1>
        </div>
        <div className="surface-card grid items-center gap-6 p-6 lg:grid-cols-2 lg:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-4xl bg-[#f6ecef]">
            {about.image ? (
              <Image
                src={about.image.url}
                alt={about.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            ) : null}
          </div>
          <div className="space-y-6 text-right">
            <p className="text-lg leading-10 text-[var(--text-muted)]">{about.description}</p>
            <div className="flex justify-end">
              <Image
                src="/images/signature.png"
                alt="توقيع هبة اللكاوي"
                width={150}
                height={60}
                className="h-auto w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection services={about.services} />
    </div>
  );
}
