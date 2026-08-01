import { ArticleInsight as Insight } from "@/types/articleInsight";

type Props = {
    insight: Insight;
};

export default function ArticleInsight({
    insight,
}: Props) {

    return (

<div className="space-y-8">

<section>

<h2 className="text-2xl font-bold">
🧠 Explained Simply
</h2>

<p className="mt-3">
{insight.simpleExplanation}
</p>

</section>

<section>

<h2 className="text-2xl font-bold">
📖 Background
</h2>

<p className="mt-3">
{insight.background}
</p>

</section>

<section>

<h2 className="text-2xl font-bold">
🌍 Why it Matters
</h2>

<p className="mt-3">
{insight.whyItMatters}
</p>

</section>

</div>

);

}