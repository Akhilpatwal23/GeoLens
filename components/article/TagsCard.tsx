type Props = {
  title: string;
  tags: string[];
};

const TagsCard = ({ title, tags }: Props) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-bold">
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TagsCard;