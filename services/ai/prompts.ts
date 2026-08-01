export function articlePrompt(article: string) {
  return `
You are a geopolitical analyst.

Read the article carefully.

Return JSON.

{
  "simpleExplanation":"",
  "background":"",
  "whyItMatters":"",
  "timeline":[],
  "countries":[],
  "people":[],
  "organizations":[],
  "topics":[],
  "learnMore":[]
}

Explain in simple English.

Do not invent facts.

Article:

${article}
`;
}