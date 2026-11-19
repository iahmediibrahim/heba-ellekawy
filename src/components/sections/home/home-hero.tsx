import Image from "next/image"

export function HomeHero({ imageUrl, imageAlt }: { imageUrl: string; imageAlt: string }) {
  return (
    <section className="relative h-[clamp(20rem,69vw,42rem)] w-full overflow-hidden bg-[var(--surface-muted)]">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </section>
  )
}
