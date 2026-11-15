import Link from "next/link"
import type { Metadata } from "next"

import { Section, SectionHeading } from "@/components/ui/section"
import { ServiceCard } from "@/components/sections/service-card";
import type { Service } from "@/lib/types";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <Section>
      <SectionHeading
        eyebrow="الخدمات"
        title="خدماتنا"
        copy="خدمات مرتبة بصياغة أوضح وتجربة بصرية أخف تساعد الزائر على الوصول بسرعة لما يحتاجه."
        align="center"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/contact" className="primary-button">
          للاستفسار والحجز
        </Link>
      </div>
    </Section>
  );
}
