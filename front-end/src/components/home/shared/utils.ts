import { COLORS } from "./constants";

export const formatCurrency = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseFloat(digits) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors duration-200";

export const inputSty = {
  background: COLORS.primaryLight,
  border: `1.5px solid ${COLORS.primaryBorder}`,
};

export const focusGreen = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = COLORS.primary;
};

export const blurGray = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = COLORS.primaryBorder;
};
