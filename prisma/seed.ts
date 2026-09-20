// Seed categories with an upsert in your deployment pipeline.
export const categories = [
  ["community", "コミュニティ", "Community"], ["music", "音楽・クラブ", "Music & Nightlife"],
  ["language", "言語交流", "Language Exchange"], ["business", "ビジネス", "Business"],
  ["workshop", "ワークショップ", "Workshops"], ["food", "食・マーケット", "Food & Markets"],
  ["sports", "スポーツ", "Sports"]
] as const;
