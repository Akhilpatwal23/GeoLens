import { BookOpen, Brain, CalendarDays, Globe2, Sparkles } from "lucide-react";
import { ArticleInsight as Insight } from "@/types/articleInsight";

type Props = {
  insight: Insight;
};

export default function ArticleInsight({ insight }: Props) {
  const sections = [
    { title: "Explained Simply", text: insight.simpleExplanation, icon: Brain },
    { title: "Background", text: insight.background, icon: BookOpen },
    { title: "Why it Matters", text: insight.whyItMatters, icon: Globe2 },
  ];

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
        <div className="flex items-center gap-2 text-blue-700">
          <Sparkles size={17} aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-wider">News, explained</p>
        </div>
        <h2 className="mt-1 text-lg font-bold text-slate-950">The context behind the story</h2>
      </div>

      <div className="divide-y divide-slate-100 px-5">
        {sections.map(({ title, text, icon: Icon }) => (
          <section key={title} className="py-4 first:pt-5 last:pb-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Icon size={16} className="shrink-0 text-blue-700" aria-hidden="true" />
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </section>
        ))}

        {insight.timeline.length > 0 && (
          <section className="py-4 last:pb-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <CalendarDays size={16} className="shrink-0 text-blue-700" aria-hidden="true" />
              Timeline
            </h3>
            <ol className="mt-3 space-y-0">
              {insight.timeline.map((item, index) => (
                <li key={`${index}-${item}`} className="relative border-l border-blue-200 pb-4 pl-4 text-sm leading-6 text-slate-600 last:border-transparent last:pb-0">
                  <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-blue-600" />
                  {item}
                </li>
              ))}
            </ol>
          </section>
        )}

      </div>
    </section>
  );
}