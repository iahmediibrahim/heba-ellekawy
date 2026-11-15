import { ServiceGrid } from "@/components/sections/service-grid"
import { Section, SectionHeading } from "@/components/ui/section"
import type { Service } from "@/lib/types"

export function HomeServices({ services }: { services: Service[] }) {
  if (!services.length) {
    return null
  }

  return (
    <Section>
      <SectionHeading eyebrow="الخدمات" title="خدماتنا" />
      <ServiceGrid services={services.slice(0, 4)} />
    </Section>
  )
}
