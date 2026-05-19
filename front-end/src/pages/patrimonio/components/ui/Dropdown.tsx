import { useState, useRef, useEffect } from "react";
import { COLORS } from "../../constants/colors";
import { TIPOS } from "../../constants/options";
import { ChevronIcon } from "../icons";
import type { PatrimonioTipo } from "../../types/patrimonio";

interface DropdownProps {
  value: PatrimonioTipo;
  onChange: (v: PatrimonioTipo) => void;
}

export const Dropdown = ({ value, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3.5 rounded-xl flex items-center justify-between cursor-pointer text-sm"
        style={{
          background: COLORS.primaryLight,
          border: `1.5px solid ${open ? COLORS.primary : COLORS.primaryBorder}`,
        }}
      >
        <span style={{ color: value ? "#1f2937" : "#9ca3af" }}>
          {value || "Selecione o tipo de patrimônio"}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+6px)] left-0 right-0 rounded-xl overflow-hidden z-10"
          style={{
            background: "white",
            border: `1.5px solid ${COLORS.primaryBorder}`,
          }}
        >
          {TIPOS.map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => {
                onChange(tipo);
                setOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm"
              style={{
                background: value === tipo ? COLORS.primaryLight : "transparent",
              }}
            >
              {tipo}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
