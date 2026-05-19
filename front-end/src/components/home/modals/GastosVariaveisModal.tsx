import { useState } from "react";
import { X, User, Tag, DollarSign, Calendar, Check } from "lucide-react";
import { COLORS, FAMILIARES } from "../shared/constants";
import type { GastoVariavel } from "../shared/types";
import { TipoToggle } from "../shared/TipoToggle";
import { inputBase, inputSty, focusGreen, blurGray, formatCurrency } from "../shared/utils";

interface GastosVariaveisModalProps {
  onClose: () => void;
  onAdd: (g: GastoVariavel) => void;
  onSwitchToFixo: () => void;
}

export const GastosVariaveisModal = ({ onClose, onAdd, onSwitchToFixo }: GastosVariaveisModalProps) => {
  const [familiar, setFamiliar] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [gastoUnico, setGastoUnico] = useState(false);

  const isValid = familiar !== "" && setor.trim() !== "" && valor !== "" && data !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onAdd({ nome: familiar, categoria: setor, valor: `R$${valor}` });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">Gastos Variaveis</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" style={{ background: COLORS.primary }}>
            <X size={14} />
          </button>
        </div>

        <TipoToggle value="Variável" onChange={(v) => { if (v === "Fixo") onSwitchToFixo(); }} />

        <div className="px-5 pb-5 flex flex-col gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <User size={13} style={{ color: COLORS.primary }} /> Familiar
            </label>
            <select value={familiar} onChange={(e) => setFamiliar(e.target.value)} className={inputBase} style={inputSty} onFocus={focusGreen} onBlur={blurGray}>
              <option value="">Selecione um familiar...</option>
              {FAMILIARES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <Tag size={13} style={{ color: COLORS.primary }} /> Setor
              </label>
              <input type="text" placeholder="Ex. Alimentacao..." value={setor} onChange={(e) => setSetor(e.target.value)} className={inputBase} style={inputSty} onFocus={focusGreen} onBlur={blurGray} />
            </div>
            <div className="w-32">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <DollarSign size={13} style={{ color: COLORS.primary }} /> Valor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: COLORS.primary }}>R$</span>
                <input type="text" inputMode="numeric" placeholder="0,00" value={valor} onChange={(e) => setValor(formatCurrency(e.target.value))} className={`${inputBase} pl-9`} style={inputSty} onFocus={focusGreen} onBlur={blurGray} />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <Calendar size={13} style={{ color: COLORS.primary }} /> Data
            </label>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className={inputBase} style={inputSty} onFocus={focusGreen} onBlur={blurGray} />
          </div>

          <button type="button" onClick={() => setGastoUnico((v) => !v)}
            className="self-start flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={gastoUnico ? { background: COLORS.primary, color: "white" } : { background: COLORS.primaryLight, color: COLORS.primary, border: `1px solid ${COLORS.primaryBorder}` }}>
            {gastoUnico && <Check size={12} />}
            Gasto unico ou eventual
          </button>

          <button type="button" onClick={handleSubmit} disabled={!isValid}
            className="w-full py-3.5 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
            style={isValid ? { background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, boxShadow: `0 6px 20px ${COLORS.primary}40`, cursor: "pointer" } : { background: "#d1d5db", cursor: "not-allowed" }}>
            <Check size={16} /> Adicionar gasto
          </button>
        </div>
      </div>
    </div>
  );
};
