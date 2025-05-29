import ReactMarkdown from "react-markdown";
import guidesContent from "#app/assets/guides.md?raw";

export default function Guides() {
  return (
    <div className="prose dark:prose-invert mx-auto p-6">
      <ReactMarkdown>{guidesContent}</ReactMarkdown>
    </div>
  );
}
