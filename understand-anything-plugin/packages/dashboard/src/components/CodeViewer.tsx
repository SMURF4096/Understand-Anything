import Editor from "@monaco-editor/react";
import { useDashboardStore } from "../store";

const extensionToLanguage: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  py: "python",
  go: "go",
  rs: "rust",
  rb: "ruby",
  java: "java",
  kt: "kotlin",
  cs: "csharp",
  cpp: "cpp",
  c: "c",
  swift: "swift",
  php: "php",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  html: "html",
  css: "css",
  sql: "sql",
  sh: "shell",
  bash: "shell",
};

function getLanguage(filePath: string | undefined): string {
  if (!filePath) return "plaintext";
  const ext = filePath.split(".").pop()?.toLowerCase() ?? "";
  return extensionToLanguage[ext] ?? "plaintext";
}

export default function CodeViewer() {
  const graph = useDashboardStore((s) => s.graph);
  const selectedNodeId = useDashboardStore((s) => s.selectedNodeId);

  const node = graph?.nodes.find((n) => n.id === selectedNodeId) ?? null;

  if (!node) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm">
          Select a node to view its source code
        </p>
      </div>
    );
  }

  const language = getLanguage(node.filePath);
  const lineInfo = node.lineRange
    ? `Lines ${node.lineRange[0]}-${node.lineRange[1]}`
    : "Full file";

  const placeholderCode = [
    `// ${node.name}`,
    `// Type: ${node.type}`,
    `// File: ${node.filePath ?? "unknown"}`,
    `// ${lineInfo}`,
    `//`,
    `// Summary:`,
    `// ${node.summary}`,
    `//`,
    `// Note: Source code display requires file content access.`,
    `// In a full integration, this panel will show the actual`,
    `// source code from the analyzed project.`,
    "",
    ...(node.tags.length > 0
      ? [`// Tags: ${node.tags.join(", ")}`]
      : []),
    ...(node.languageNotes
      ? [`//`, `// Language Notes:`, `// ${node.languageNotes}`]
      : []),
  ].join("\n");

  return (
    <div className="h-full w-full flex flex-col bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-2 bg-gray-900 border-b border-gray-700 shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-700 px-2 py-0.5 rounded">
          {node.type}
        </span>
        <span className="text-sm font-bold text-white truncate">
          {node.name}
        </span>
        {node.filePath && (
          <span className="text-xs text-gray-500 truncate ml-auto">
            {node.filePath}
          </span>
        )}
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={language}
          value={placeholderCode}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            padding: { top: 8 },
          }}
        />
      </div>
    </div>
  );
}
