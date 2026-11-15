import Link from "next/link"

import { EmptyState } from "@/components/ui/empty-state"
import { Section, SectionHeading } from "@/components/ui/section"
import { ServiceGrid } from "@/components/sections/service-grid"
import type { Service } from "@/lib/types"

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <Section>
      <SectionHeading
        eyebrow="الخدمات"
        title="خدماتنا"
        copy="خدمات مرتبة بصياغة أوضح وتجربة بصرية أخف تساعد الزائر على الوصول بسرعة لما يحتاجه."
        align="center"
      />

      {services.length ? (
        <ServiceGrid services={services} />
      ) : (
        <EmptyState>لا توجد خدمات متاحة حاليًا.</EmptyState>
      )}

      <div className="flex justify-center">
        <Link href="/contact" className="primary-button">
          للاستفسار والحجز
        </Link>
      </div>
    </Section>
  )
}
