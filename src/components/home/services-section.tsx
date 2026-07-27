import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/lib/types";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="section-stack">
      <div className="section-heading" data-align="center">
        <p className="eyebrow">الخدمات</p>
        <h2 className="section-title">خدماتنا</h2>
        <p className="section-copy">
          خدمات مرتبة بصياغة أوضح وتجربة بصرية أخف تساعد الزائر على الوصول بسرعة لما يحتاجه.
        </p>
      </div>
      <div className="surface-card grid gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
        {services.map((service) => (
          <section
            key={service.id}
            className="surface-muted flex flex-col items-center justify-center px-5 py-8 text-center"
          >
            <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-white/90 shadow-sm">
              {service.icon ? (
                <Image
                  src={service.icon.url}
                  alt={service.name}
                  width={80}
                  height={80}
                  className="h-14 w-14 object-contain"
                />
              ) : null}
            </div>
            <p className="font-semibold text-slate-800">{service.name}</p>
          </section>
        ))}
        <div className="sm:col-span-2 xl:col-span-4">
          <div className="flex justify-center">
            <Link href="/contact" className="primary-button">
              للاستفسار والحجز
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
