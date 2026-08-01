import { ReactNode } from "react";

import Container from "@/components/layout/Container";

type Props = {
  children: ReactNode;
};

const ArticleLayout = ({ children }: Props) => {
  return (
    <Container>
      <article className="mx-auto max-w-5xl py-10 lg:py-14">
        {children}
      </article>
    </Container>
  );
};

export default ArticleLayout;