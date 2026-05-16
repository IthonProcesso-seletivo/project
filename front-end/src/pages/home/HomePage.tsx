import { useState } from "react";
import { PlusCircle, Trash2, X, Lock, TrendingUp, User, Tag, DollarSign, Calendar, Check, RefreshCw, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/home/Header";

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  primary: "#2D815D",
  primaryDark: "#1e5c40",
  primaryLight: "#EAF0EA",
  primaryBorder: "#c2d9cb",
} as const;

const FAMILIARES = ["Ricardo", "Helena", "Lucas", "Zilma"];
const PERIODOS = ["Mensal", "Semanal", "Quinzenal", "Anual"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface GastoFixo {
  nome: string;
  categoria: string;
  valor: string;
  parcelas: string;
}

interface GastoVariavel {
  nome: string;
  categoria: string;
  valor: string;
}

// ─── Shared helpers ───────────────────────────────────────────────────────────

const formatCurrency = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseFloat(digits) / 100;
  return num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors duration-200";

const inputSty = {
  background: COLORS.primaryLight,
  border: `1.5px solid ${COLORS.primaryBorder}`,
};

const focusGreen = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = COLORS.primary;
};
const blurGray = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = COLORS.primaryBorder;
};

// ─── Mini Modal Extra Confirmação ────────────────────────────────────────────

const ExcluirContaMiniModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div className="bg-white rounded-2xl w-full max-w-xs shadow-2xl overflow-hidden">
      {/* Header verde */}
      <div
        className="px-5 py-3.5 flex items-center justify-center"
        style={{ background: COLORS.primary }}
      >
        <h2 className="text-sm font-extrabold text-white tracking-wide uppercase">
          ATENÇÃO:
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-5 flex flex-col items-center gap-4">
        <p className="text-gray-800 font-semibold text-sm text-center">
          Excluir conta permanentemente?
        </p>

        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
            style={{ background: "#dc2626" }}
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
            style={{ background: COLORS.primary }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Modal Excluir Conta ──────────────────────────────────────────────────────

const ExcluirContaModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [showMini, setShowMini] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }}
        onClick={(e) => { if (e.target === e.currentTarget && !showMini) onClose(); }}
      >
        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
          {/* Header verde */}
          <div
            className="px-5 py-4 flex items-center justify-center"
            style={{ background: COLORS.primary }}
          >
            <h2 className="text-base font-extrabold text-white tracking-wide uppercase">
              ATENÇÃO:
            </h2>
          </div>

          {/* Body */}
          <div className="px-6 py-6 flex flex-col items-center gap-5">
            <div className="text-center flex flex-col gap-2">
              <p className="text-gray-800 font-semibold text-sm">
                Excluir conta permanentemente?
              </p>
              <p className="text-gray-600 text-sm leading-relaxed hidden sm:block">
                Esta ação não poderá ser desfeita. Você perderá todos os dados vinculados a este arquivo.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setShowMini(true)}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
                style={{ background: "#dc2626" }}
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition-all duration-200 active:scale-95 hover:opacity-90"
                style={{ background: COLORS.primary }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMini && (
        <ExcluirContaMiniModal
          onClose={() => setShowMini(false)}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

// ─── Toggle Fixo / Variável ───────────────────────────────────────────────────

const TipoToggle = ({
  value,
  onChange,
}: {
  value: "Fixo" | "Variável";
  onChange: (v: "Fixo" | "Variável") => void;
}) => (
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

// ─── Modal Gastos Fixos ───────────────────────────────────────────────────────

const GastosFixosModal = ({
  onClose,
  onAdd,
  onSwitchToVariavel,
}: {
  onClose: () => void;
  onAdd: (g: GastoFixo) => void;
  onSwitchToVariavel: () => void;
}) => {
  const [familiar, setFamiliar] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [data, setData] = useState("");

  const isValid = familiar !== "" && setor.trim() !== "" && valor !== "" && periodo !== "" && data !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    onAdd({ nome: familiar, categoria: setor, valor: `R$${valor}`, parcelas: periodo });
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
          <h2 className="text-base font-bold text-gray-800">Gastos Fixos</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            style={{ background: COLORS.primary }}
          >
            <X size={14} />
          </button>
        </div>

        <TipoToggle value="Fixo" onChange={(v) => { if (v === "Variável") onSwitchToVariavel(); }} />

        <div className="px-5 pb-5 flex flex-col gap-4">
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
              {FAMILIARES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <Tag size={13} style={{ color: COLORS.primary }} /> Setor
              </label>
              <input
                type="text"
                placeholder="Ex. Moradia..."
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className={inputBase}
                style={inputSty}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>
            <div className="w-32">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <DollarSign size={13} style={{ color: COLORS.primary }} /> Valor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: COLORS.primary }}>
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
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <RefreshCw size={13} style={{ color: COLORS.primary }} /> Período
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className={inputBase}
                style={inputSty}
                onFocus={focusGreen}
                onBlur={blurGray}
              >
                <option value="">Mensal...</option>
                {PERIODOS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <Calendar size={13} style={{ color: COLORS.primary }} /> Data
              </label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className={inputBase}
                style={inputSty}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
            style={
              isValid
                ? { background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, boxShadow: `0 6px 20px ${COLORS.primary}40`, cursor: "pointer" }
                : { background: "#d1d5db", cursor: "not-allowed" }
            }
          >
            <Check size={16} /> Adicionar gasto
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Modal Gastos Variáveis ───────────────────────────────────────────────────

const GastosVariaveisModal = ({
  onClose,
  onAdd,
  onSwitchToFixo,
}: {
  onClose: () => void;
  onAdd: (g: GastoVariavel) => void;
  onSwitchToFixo: () => void;
}) => {
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
          <h2 className="text-base font-bold text-gray-800">Gastos Variáveis</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            style={{ background: COLORS.primary }}
          >
            <X size={14} />
          </button>
        </div>

        <TipoToggle value="Variável" onChange={(v) => { if (v === "Fixo") onSwitchToFixo(); }} />

        <div className="px-5 pb-5 flex flex-col gap-4">
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
              {FAMILIARES.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <Tag size={13} style={{ color: COLORS.primary }} /> Setor
              </label>
              <input
                type="text"
                placeholder="Ex. Alimentação..."
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                className={inputBase}
                style={inputSty}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>
            <div className="w-32">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <DollarSign size={13} style={{ color: COLORS.primary }} /> Valor
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: COLORS.primary }}>
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
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <Calendar size={13} style={{ color: COLORS.primary }} /> Data
            </label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className={inputBase}
              style={inputSty}
              onFocus={focusGreen}
              onBlur={blurGray}
            />
          </div>

          <button
            type="button"
            onClick={() => setGastoUnico((v) => !v)}
            className="self-start flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={
              gastoUnico
                ? { background: COLORS.primary, color: "white" }
                : { background: COLORS.primaryLight, color: COLORS.primary, border: `1px solid ${COLORS.primaryBorder}` }
            }
          >
            {gastoUnico && <Check size={12} />}
            Gasto único ou eventual
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200"
            style={
              isValid
                ? { background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`, boxShadow: `0 6px 20px ${COLORS.primary}40`, cursor: "pointer" }
                : { background: "#d1d5db", cursor: "not-allowed" }
            }
          >
            <Check size={16} /> Adicionar gasto
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Chart Components ─────────────────────────────────────────────────────────

const DonutChart = ({ total, spent }: { total: number; spent: number }) => {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(spent / total, 1);
  const spentDash = pct * circ;
  const availDash = circ - spentDash;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#d1fae5" strokeWidth="18" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#16a34a" strokeWidth="18"
          strokeDasharray={`${availDash} ${spentDash}`} strokeDashoffset={circ / 4} strokeLinecap="round" />
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#ef4444" strokeWidth="18"
          strokeDasharray={`${spentDash} ${availDash}`} strokeDashoffset={circ / 4 - availDash} strokeLinecap="round" />
      </svg>
      <div className="flex flex-col gap-1.5 text-xs self-start px-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600 inline-block shrink-0" />
          Total disponivel : {total}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block shrink-0" />
          Total gasto : {spent}
        </span>
      </div>
    </div>
  );
};

const HorizontalBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gray-500 w-16 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-sm h-5 overflow-hidden">
        <div className="h-full rounded-sm transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

// ─── Card Components ──────────────────────────────────────────────────────────

const Card = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 ${className}`}>
    <div className="flex justify-center">
      <span className="bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-xl tracking-wide shadow-sm w-full text-center">
        {title}
      </span>
    </div>
    {children}
  </div>
);

const AddButton = ({ label, onClick }: { label: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="mt-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl w-full transition-all duration-150 shadow-sm"
  >
    {label} <PlusCircle size={16} />
  </button>
);

const GastosFixosContent = ({ gastosFixos }: { gastosFixos: GastoFixo[] }) => (
  <div className="flex-1 space-y-1">
    {gastosFixos.map((g, i) => (
      <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0 gap-2">
        <span className="w-16 font-medium text-gray-800 shrink-0">{g.nome}</span>
        <span className="flex-1 text-center text-gray-600">{g.categoria}</span>
        <span className="text-gray-800 font-medium shrink-0">{g.valor}</span>
        <span className="text-xs text-gray-500 w-10 text-right shrink-0">{g.parcelas}</span>
      </div>
    ))}
  </div>
);

const GastosVariaveisContent = ({ gastosVariaveis }: { gastosVariaveis: GastoVariavel[] }) => (
  <div className="flex-1 space-y-1">
    {gastosVariaveis.map((g, i) => (
      <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0 gap-2">
        <span className="w-16 font-medium text-gray-800 shrink-0">{g.nome}</span>
        <span className="flex-1 text-center text-gray-600">{g.categoria}</span>
        <span className="text-gray-800 font-medium text-right shrink-0">{g.valor}</span>
      </div>
    ))}
  </div>
);

const PatrimonioContent = ({ patrimonio }: { patrimonio: { valor: string; tipo: string; nome: string }[] }) => (
  <>
    <div className="grid grid-cols-3 text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-3 py-1.5 bg-green-50">
      <span>Valor</span>
      <span className="text-center">Tipo</span>
      <span className="text-right">Nome</span>
    </div>
    <div className="flex-1">
      {patrimonio.map((item, i) => (
        <div key={i} className="grid grid-cols-3 items-center text-sm text-gray-700 py-2.5 border-b border-gray-100 last:border-0">
          <span className="text-gray-800 font-medium text-xs">{item.valor}</span>
          <span className="text-center font-bold">{item.tipo}</span>
          <span className="text-right font-bold">{item.nome}</span>
        </div>
      ))}
    </div>
  </>
);

const SalarioGastoContent = () => (
  <div className="flex-1 px-2 pt-1">
    <HorizontalBar label="Fixos" value={18000} max={20000} color="#16a34a" />
    <HorizontalBar label="Variáveis" value={9000} max={20000} color="#16a34a" />
    <div className="flex justify-between text-xs text-gray-400 mt-1 ml-[4.5rem]">
      {["4K", "8K", "12K", "16K", "20k"].map((v) => <span key={v}>{v}</span>)}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FamigestaoHome() {
  const patrimonio = [
    { valor: "R$1.000.000,00", tipo: "Casa", nome: "Helena" },
    { valor: "R$100.000,00", tipo: "Carro", nome: "Ricardo" },
  ];

  const [gastosFixos, setGastosFixos] = useState<GastoFixo[]>([
    { nome: "Ricardo", categoria: "Telefone", valor: "R$400,00", parcelas: "3 / 12" },
    { nome: "Lucas", categoria: "Faculdade", valor: "R$900,00", parcelas: "2 / 6" },
  ]);

  const [gastosVariaveis, setGastosVariaveis] = useState<GastoVariavel[]>([
    { nome: "Zilma", categoria: "Almoço", valor: "R$400,00" },
    { nome: "Helena", categoria: "shopping", valor: "R$900,00" },
  ]);

  // ── Estados dos modais ────────────────────────────────────────────────────
  const [showModalFixos, setShowModalFixos] = useState(false);
  const [showModalVariaveis, setShowModalVariaveis] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);

  // ── Handlers para trocar entre modais via toggle ──────────────────────────
  const handleSwitchToVariavel = () => {
    setShowModalFixos(false);
    setShowModalVariaveis(true);
  };

  const handleSwitchToFixo = () => {
    setShowModalVariaveis(false);
    setShowModalFixos(true);
  };

  const handleConfirmarExclusao = () => {
    // Lógica de exclusão de conta aqui
    setShowModalExcluir(false);
    console.log("Conta excluída");
  };

  return (
    <div className="min-h-screen bg-[#e8f0ea] font-['DM_Sans',sans-serif]">
      <Header />

      {/* ── Modais ── */}
      {showModalFixos && (
        <GastosFixosModal
          onClose={() => setShowModalFixos(false)}
          onAdd={(g) => setGastosFixos((prev) => [...prev, g])}
          onSwitchToVariavel={handleSwitchToVariavel}
        />
      )}
      {showModalVariaveis && (
        <GastosVariaveisModal
          onClose={() => setShowModalVariaveis(false)}
          onAdd={(g) => setGastosVariaveis((prev) => [...prev, g])}
          onSwitchToFixo={handleSwitchToFixo}
        />
      )}
      {showModalExcluir && (
        <ExcluirContaModal
          onClose={() => setShowModalExcluir(false)}
          onConfirm={handleConfirmarExclusao}
        />
      )}

      {/* ── MOBILE ── */}
      <main className="lg:hidden p-4 flex flex-col gap-4 max-w-md mx-auto">
        <Card title="Salário Restante">
          <DonutChart total={2500} spent={500} />
        </Card>
        <Card title="Salário Gasto">
          <SalarioGastoContent />
        </Card>
        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" onClick={() => setShowModalFixos(true)} />
        </Card>
        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" onClick={() => setShowModalVariaveis(true)} />
        </Card>
        <Card title="Patrimônio">
          <PatrimonioContent patrimonio={patrimonio} />
            <Link to="/patrimonio">
            <AddButton label="Adicionar Patrimônio" />
          </Link>
        </Card>
        <div className="flex justify-end pb-2">
          <button
            onClick={() => setShowModalExcluir(true)}
            className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95"
          >
            <Trash2 size={15} /> Excluir Conta
          </button>
        </div>
      </main>

      {/* ── DESKTOP ── */}
      <main
        className="hidden lg:grid p-5 gap-4 max-w-5xl mx-auto"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto" }}
      >
        <Card title="Patrimônio" className="row-span-2">
          <PatrimonioContent patrimonio={patrimonio} />
          <Link to="/patrimonio">
            <AddButton label="Adicionar Patrimônio" />
          </Link>
        </Card>

        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" onClick={() => setShowModalFixos(true)} />
        </Card>

        <Card title="Salário Restante">
          <DonutChart total={2500} spent={500} />
        </Card>

        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" onClick={() => setShowModalVariaveis(true)} />
        </Card>

        <Card title="Salário Gasto">
          <SalarioGastoContent />
        </Card>
      </main>

      <div className="hidden lg:flex justify-end px-5 pb-5 max-w-5xl mx-auto">
        <button
          onClick={() => setShowModalExcluir(true)}
          className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95"
        >
          <Trash2 size={15} /> Excluir Conta
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
