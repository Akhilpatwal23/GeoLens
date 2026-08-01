import { ReactNode } from "react";

type Props = {
  content: ReactNode;
  sidebar: ReactNode;
};

const ArticleReadingLayout = ({ content, sidebar }: Props) => {
  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12">
      <main className="lg:col-span-8">
        {content}
      </main>

      <aside className="lg:col-span-4">
        <div className="sticky top-24">
          {sidebar}
        </div>
      </aside>
    </div>
  );
};

export default ArticleReadingLayout;