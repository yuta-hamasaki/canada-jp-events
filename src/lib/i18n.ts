export const locales = ["ja", "en"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale { return locales.includes(value as Locale); }
export const copy = {
 ja:{discover:"バンクーバーで、日本とつながる。",lead:"日本文化、コミュニティ、音楽、食。街で生まれる新しい出会いを見つけよう。",browse:"イベントを探す",host:"イベントを掲載",featured:"注目のイベント",all:"すべて見る",categories:"興味から見つける",hostTitle:"あなたのイベントを、街のみんなへ。"},
 en:{discover:"Find Japan in Vancouver.",lead:"Culture, community, music and food. Discover meaningful moments happening across the city.",browse:"Explore events",host:"List an event",featured:"Featured events",all:"View all",categories:"Browse by interest",hostTitle:"Bring your event to the city."}
} as const;
