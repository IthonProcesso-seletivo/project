import React from "react";
import { COLORS } from "../../constants/colors";

interface CurrencyInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => (
  <div className="relative">
    <input
      type="text"
      inputMode="numeric"
      value={value}
      onChange={onChange}
      placeholder="0,00"
      className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors duration-200"
      style={{
        background: COLORS.primaryLight,
        border: `1.5px solid ${COLORS.primaryBorder}`,
      }}
    />
    <span
      className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold"
      style={{ color: COLORS.primary }}
    >
      R$
    </span>
  </div>
);
