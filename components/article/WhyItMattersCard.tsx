import { Globe2 } from "lucide-react";

type Props = {
  text: string;
};

const WhyItMattersCard = ({ text }: Props) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Globe2 className="text-green-600" size={20} />

        <h2 className="text-lg font-bold">
          Why It Matters
        </h2>
      </div>

      <p className="text-sm leading-7 text-gray-600">
        {text}
      </p>
    </section>
  );
};

export default WhyItMattersCard;