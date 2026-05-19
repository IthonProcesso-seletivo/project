import { Lock, TrendingUp } from "lucide-react";
import { COLORS } from "./constants";

interface TipoToggleProps {
  value: "Fixo" | "Variável";
  onChange: (v: "Fixo" | "Variável") => void;
}

export const TipoToggle = ({ value, onChange }: TipoToggleProps) => (
  <div className="px-5 pb-4">
    <div
      className="flex rounded-xl p-1 gap-1"
      style={{ background: COLORS.primaryLight, border: `1.5px solid ${COLORS.primaryBorder}` }}
    >
      {(["Fixo", "Variável"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
          style={
            value === t
              ? { background: COLORS.primary, color: "white" }
              : { background: "transparent", color: COLORS.primary }
          }
        >
          {t === "Fixo" ? <Lock size={13} /> : <TrendingUp size={13} />}
          {t}
        </button>
      ))}
    </div>
  </div>
);
