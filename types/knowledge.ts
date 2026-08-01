export type TimelineEvent = {
  date: string;
  event: string;
};

export type KeyTerm = {
  term: string;
  meaning: string;
};

export type Knowledge = {
  summary: string;
  whyItMatters: string;

  timeline: TimelineEvent[];

  keyTerms: KeyTerm[];

  countries: string[];

  organizations: string[];
};