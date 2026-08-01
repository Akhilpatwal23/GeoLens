import { BookOpen } from "lucide-react";

type KeyTerm = {
  term: string;
  meaning: string;
};

type Props = {
  terms: KeyTerm[];
};

const KeyTermsCard = ({ terms }: Props) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <BookOpen className="text-orange-500" size={20} />

        <h2 className="text-lg font-bold">
          Key Terms
        </h2>
      </div>

      <div className="space-y-4">
        {terms.map((term) => (
          <div key={term.term}>
            <h3 className="font-semibold">
              {term.term}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {term.meaning}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyTermsCard;