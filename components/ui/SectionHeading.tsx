import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  href?: string;
  description?: string;
};

const SectionHeading = ({
  title,
  href,
  description,
}: Props) => {
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="group hidden items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900 md:flex"
        >
          View All

          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
};

export default SectionHeading;