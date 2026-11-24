import { ReactNode } from "react";

type Props = {
  content: ReactNode;
  sidebar: ReactNode;
};

const ArticleReadingLayout = ({ content, sidebar }: Props) => {
  return (
    <div className="mt-6 grid items-start gap-8 lg:grid-cols-12">
      <main className="lg:col-span-8">
        {content}
      </main>

      <aside className="lg:col-span-4">
        <div className="space-y-5 lg:sticky lg:top-24">
          {sidebar}
        </div>
      </aside>
    </div>
  );
};

export default ArticleReadingLayout;