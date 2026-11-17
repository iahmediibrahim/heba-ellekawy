export type NavigationLink = {
  label: string
  href: string
}

export type NavigationSection = {
  title: string
  items: NavigationLink[]
}

export type NavigationGroup = {
  label: string
  href?: string
  items?: NavigationLink[]
  sections?: NavigationSection[]
}

/**
 * كل الأقسام التي تحتوي على مقالات مجمّعة تحت مدونة واحدة في شريط التنقل.
 */
export const blogSections: NavigationSection[] = [
  {
    title: "الصحة النفسية",
    items: [
      { label: "خواطر ونصائح نفسية", href: "/articles/thoughts-and-tips" },
      {
        label: "مقالات عن العلاقات والتربية",
        href: "/articles/family-and-educational",
      },
      { label: "مقالات نفسية", href: "/articles/psychological" },
      {
        label: "بريد المشكلات",
        href: "/articles/opinion-articles-and-problems-mail",
      },
    ],
  },
  {
    title: "كتابة حرة ومحتوى",
    items: [
      { label: "خواطر ومقالات عامة", href: "/articles/other" },
      {
        label: "ترشيحات الكتب والأفلام والروايات",
        href: "/articles/nominations-for-books-movies-and-novels",
      },
      { label: "أنا والأماكن", href: "/articles/me-and-places" },
      { label: "رحلتي مع الكتابة", href: "/articles/my-journey-with-writing" },
      { label: "قصص مصورة", href: "/articles/short-story" },
      { label: "English Articles", href: "/articles/english-articles" },
      { label: "القصص القصيرة", href: "/stories" },
      { label: "الروايات والكتب", href: "/novels-books" },
    ],
  },
]

export const navigationGroups: NavigationGroup[] = [
  { label: "الرئيسية", href: "/" },
  {
    label: "المدونة",
    href: "/blog",
    sections: blogSections,
  },
  { label: "عن المؤسس", href: "/author" },
]

export const blogLinks: NavigationLink[] = blogSections.flatMap(
  (section) => section.items,
)

export function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/"
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}
