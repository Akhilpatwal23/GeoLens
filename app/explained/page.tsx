import Container from "@/components/layout/Container";

export default function ExplainedPage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-4xl font-bold">
          Explained
        </h1>

        <p className="mt-4 text-gray-600">
          This page will contain AI-generated explanations,
          historical context, timelines, and learning guides.
        </p>
      </div>
    </Container>
  );
}