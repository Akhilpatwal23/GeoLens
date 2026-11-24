import KeyTermsCard from "./KeyTermsCard";
import TagsCard from "./TagsCard";

import { ArticleInsight } from "@/types/articleInsight";

type Props = {
  insight: ArticleInsight;
};

const AISidebar = ({ insight }: Props) => {
  const terms = insight.topics.slice(0, 4).map((topic) => ({
    term: topic,
    meaning: "Key topic discussed in this article",
  }));

  return (
    <div className="space-y-4">
      {terms.length > 0 && <KeyTermsCard terms={terms} />}
      {insight.countries.length > 0 && <TagsCard title="Countries" tags={insight.countries} />}
      {insight.organizations.length > 0 && <TagsCard title="Organizations" tags={insight.organizations} />}
    </div>
  );
};

export default AISidebar;