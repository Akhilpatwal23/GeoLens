import { ReactNode } from "react";

import Container from "@/components/layout/Container";

type Props = {
  children: ReactNode;
};

const ArticleLayout = ({ children }: Props) => {
  return (
    <Container>
      <article className="mx-auto max-w-6xl py-8 lg:py-10">
        {children}
      </article>
    </Container>
  );
};

export default ArticleLayout;