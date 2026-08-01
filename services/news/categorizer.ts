export const Categories = {
  geopolitics: [
    "china",
    "taiwan",
    "russia",
    "ukraine",
    "india",
    "pakistan",
    "israel",
    "gaza",
    "iran",
    "brics",
    "quad",
    "asean",
    "nato",
    "diplomacy",
    "border",
    "summit",
    "missile",
    "war",
  ],

  economy: [
    "economy",
    "inflation",
    "repo",
    "gdp",
    "stock",
    "market",
    "oil",
    "bank",
    "finance",
    "trade",
  ],

  defense: [
    "army",
    "navy",
    "air force",
    "military",
    "exercise",
    "missile",
    "fighter",
  ],

  technology: [
    "ai",
    "openai",
    "google",
    "microsoft",
    "apple",
    "chip",
    "robot",
  ],

  science: [
    "isro",
    "nasa",
    "space",
    "rocket",
    "moon",
  ],

  climate: [
    "climate",
    "heatwave",
    "cyclone",
    "rainfall",
    "monsoon",
    "flood",
  ],

  india: [
    "supreme court",
    "parliament",
    "delhi",
    "mumbai",
    "bengaluru",
    "india",
  ],
};

export function detectCategory(text: string) {
  const lower = text.toLowerCase();

  for (const [category, words] of Object.entries(
    Categories
  )) {
    if (
      words.some((word) =>
        lower.includes(word)
      )
    )
      return category;
  }

  return "general";
}