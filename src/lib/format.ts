const arabicDateFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

const arabicDateTimeFormatter = new Intl.DateTimeFormat("ar-EG", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

/**
 * يقص النص الطويل مع الحفاظ على حدود الكلمات.
 */
export function truncateText(value: string | undefined, limit: number) {
  if (!value) {
    return ""
  }

  if (value.length <= limit) {
    return value
  }

  const sliced = value.slice(0, limit)
  const lastSpace = sliced.lastIndexOf(" ")

  return `${(lastSpace > limit * 0.6 ? sliced.slice(0, lastSpace) : sliced).trim()}...`
}

/**
 * يحوّل تواريخ Contentful (ISO) إلى صيغة عربية مقروءة.
 */
export function formatDate(value?: string | null) {
  if (!value) {
    return ""
  }

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)

  if (dateOnly) {
    const [, year, month, day] = dateOnly
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))

    return arabicDateFormatter.format(date)
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return arabicDateTimeFormatter.format(date)
}
