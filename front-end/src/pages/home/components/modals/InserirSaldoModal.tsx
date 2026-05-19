import { useState } from "react";
import { X, User, DollarSign, Check } from "lucide-react";
import { COLORS, FAMILIARES } from "../shared/constants";
import { inputBase, inputSty, focusGreen, blurGray, formatCurrency } from "../shared/utils";

export interface SaldoFamiliar {
  nome: string;
  saldo: number;
}

interface InserirSaldoModalProps {
  onClose: () => void;
  onAdd: (s: SaldoFamiliar) => void;
}

export const InserirSaldoModal = ({ onClose, onAdd }: InserirSaldoModalProps) => {
  const [familiar, setFamiliar] = useState("");
  const [valor, setValor] = useState("");

  const isValid = familiar !== "" && valor !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    const num = parseFloat(valor.replace(/\./g, "").replace(",", ".")) || 0;
    onAdd({ nome: familiar, saldo: num });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">

        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: COLORS.primary }}
        >
          <h2 className="text-base font-bold text-white">Inserir Saldo</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-opacity"
          >
            <X size={14} color="white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 flex flex-col gap-4">

          {/* Familiar */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <User size={13} style={{ color: COLORS.primary }} /> Familiar
            </label>
            <select
              value={familiar}
              onChange={(e) => setFamiliar(e.target.value)}
              className={inputBase}
              style={inputSty}
              onFocus={focusGreen}
              onBlur={blurGray}
            >
              <option value="">Selecione um familiar...</option>
              {FAMILIARES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Valor */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <DollarSign size={13} style={{ color: COLORS.primary }} /> Saldo mensal
            </label>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold"
                style={{ color: COLORS.primary }}
              >
                R$
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(formatCurrency(e.target.value))}
                className={`${inputBase} pl-9`}
                style={inputSty}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
            style={
              isValid
                ? {
                    background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
                    boxShadow: `0 6px 20px ${COLORS.primary}40`,
                    cursor: "pointer",
                  }
                : { background: "#d1d5db", cursor: "not-allowed" }
            }
          >
            <Check size={16} /> Confirmar saldo
          </button>
        </div>
      </div>
    </div>
  );
};
