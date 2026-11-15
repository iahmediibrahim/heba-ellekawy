import { ServiceCard } from "@/components/sections/service-card"
import type { Service } from "@/lib/types"

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
