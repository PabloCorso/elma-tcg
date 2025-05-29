import ReactMarkdown from "react-markdown";
import rulesMarkdown from "#app/assets/rules.md?raw";

export default function Rules() {
  return (
    <main className="prose dark:prose-invert mx-auto p-6">
      <ReactMarkdown>{rulesMarkdown}</ReactMarkdown>
    </main>
  );
}
