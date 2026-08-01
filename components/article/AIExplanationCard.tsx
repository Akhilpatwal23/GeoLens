import { Sparkles } from "lucide-react";

type Props = {
  summary: string;
};

const AIExplanationCard = ({ summary }: Props) => {
  return (
    <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="text-blue-600" size={20} />

        <h2 className="text-lg font-bold text-blue-900">
          AI Explanation
        </h2>
      </div>

      <p className="leading-7 text-blue-900">
        {summary}
      </p>
    </section>
  );
};

export default AIExplanationCard;