import { useDashboardStore } from "../store";
import type { Persona } from "../store";

const personas: { id: Persona; label: string; description: string }[] = [
  {
    id: "non-technical",
    label: "Overview",
    description: "High-level architecture view",
  },
  {
    id: "junior",
    label: "Learn",
    description: "Full dashboard with guided learning",
  },
  {
    id: "experienced",
    label: "Deep Dive",
    description: "Code-focused with chat",
  },
];

export default function PersonaSelector() {
  const persona = useDashboardStore((s) => s.persona);
  const setPersona = useDashboardStore((s) => s.setPersona);

  return (
    <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-0.5">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => setPersona(p.id)}
          title={p.description}
          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
            persona === p.id
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
