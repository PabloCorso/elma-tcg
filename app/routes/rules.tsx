import ReactMarkdown from "react-markdown";
import rulesMarkdown from "#app/assets/rules.md?raw";
import { TopBackLink } from "#app/components/top-back-link";

export default function Rules() {
  return (
    <main className="flex flex-col gap-6 p-4 pt-6">
      <TopBackLink />
      <div className="prose prose-invert mx-auto p-6">
        <ReactMarkdown>{rulesMarkdown}</ReactMarkdown>
      </div>
    </main>
  );
}
