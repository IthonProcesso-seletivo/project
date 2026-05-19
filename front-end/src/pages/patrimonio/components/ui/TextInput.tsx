import React from "react";
import { COLORS } from "../../constants/colors";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const TextInput = ({ value, onChange, placeholder }: TextInputProps) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-4 py-3.5 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors duration-200"
    style={{
      background: COLORS.primaryLight,
      border: `1.5px solid ${COLORS.primaryBorder}`,
    }}
  />
);
