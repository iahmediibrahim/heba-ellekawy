import { ServiceCard } from "@/components/sections/service-card"
import { Section, SectionHeading } from "@/components/ui/section"
import type { Service } from "@/lib/types"

export function HomeServices({ services }: { services: Service[] }) {
  if (!services.length) {
    return null
  }

  return (
    <Section>
      <SectionHeading eyebrow="الخدمات" title="خدماتنا" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.slice(0, 4).map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </Section>
  )
}
