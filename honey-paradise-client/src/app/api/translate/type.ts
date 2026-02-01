import type { Locale } from "next-intl"

interface IText {
	text: string
	detectedLanguageCode: Locale
	expiresAt: number
}

// export type TCachedTranslate = Record<string, Record<Locale, IText>>
// TCachedTranslate => { _review-uuid_: { en: { text: "Some text", expiresAt: "2025-10-20T12:12:12.231" } } }

export type TCachedTranslate = Record<string, IText>
// TCachedTranslate => { _review-uuid_: { text: "Some text", expiresAt: "2025-10-20T12:12:12.231" } }
