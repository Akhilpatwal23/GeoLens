import AIExplanationCard from "./AIExplanationCard";
import TimelineCard from "./TimelineCard";
import WhyItMattersCard from "./WhyItMattersCard";
import KeyTermsCard from "./KeyTermsCard";
import TagsCard from "./TagsCard";


import { articleKnowledge } from "@/data/knowledge";

const AISidebar = () => {
  return (
    <div className="space-y-6">
      <AIExplanationCard
        summary={articleKnowledge.summary}
      />

      <TimelineCard
        timeline={articleKnowledge.timeline}
      />

      <WhyItMattersCard
        text={articleKnowledge.whyItMatters}
      />

      <KeyTermsCard
        terms={articleKnowledge.keyTerms}
      />

      <TagsCard
        title="Countries"
        tags={articleKnowledge.countries}
      />

      <TagsCard
        title="Organizations"
        tags={articleKnowledge.organizations}
      />
    </div>
  );
};

export default AISidebar;