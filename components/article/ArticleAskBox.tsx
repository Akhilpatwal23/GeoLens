"use client";

import { FormEvent, useState } from "react";
import { LoaderCircle, MessageCircleQuestion, Send } from "lucide-react";

type Props = {
  articleSlug: string;
};

export default function ArticleAskBox({ articleSlug }: Props) {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || pending) return;

    setPending(true);
    setError("");
    setAnswer("");
    setSubmittedQuestion(trimmedQuestion);

    try {
      const response = await fetch(`/api/articles/${encodeURIComponent(articleSlug)}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not get an answer right now.");
      }

      setAnswer(data.answer);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not get an answer right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="mt-5 max-w-3xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <MessageCircleQuestion size={18} className="text-blue-700" aria-hidden="true" />
        <h2 className="text-sm font-bold text-slate-900">Ask about this story</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="article-question">Ask a question about this article</label>
        <textarea
          id="article-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={500}
          rows={2}
          placeholder="Ask a question about this article..."
          className="block w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Answers use this article only.</p>
          <button
            type="submit"
            disabled={!question.trim() || pending}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-700 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {pending ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Send size={15} aria-hidden="true" />}
            {pending ? "Thinking" : "Ask"}
          </button>
        </div>
      </form>

      {(pending || answer || error) && (
        <div className="mt-4 border-t border-slate-100 pt-4" aria-live="polite">
          {submittedQuestion && (
            <p className="text-xs font-semibold text-slate-500">Your question: {submittedQuestion}</p>
          )}
          {pending && <p className="mt-2 text-sm text-slate-600">Reading the article and preparing an answer...</p>}
          {answer && <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{answer}</p>}
          {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
        </div>
      )}
    </section>
  );
}