import { useState, type FocusEvent, type ReactNode } from "react";
import {
  X,
  Lock,
  TrendingUp,
  User,
  PlusCircle,
  Trash2,
} from "lucide-react";

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

  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const inputBase =
  "w-full px-4 py-3 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-colors duration-200";

const inputSty = {
  background: COLORS.primaryLight,
  border: `1.5px solid ${COLORS.primaryBorder}`,
};

const focusGreen = (
  e: FocusEvent<HTMLInputElement | HTMLSelectElement>
) => {
  e.currentTarget.style.borderColor = COLORS.primary;
};

const blurGray = (
  e: FocusEvent<HTMLInputElement | HTMLSelectElement>
) => {
  e.currentTarget.style.borderColor = COLORS.primaryBorder;
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

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
      style={{
        background: COLORS.primaryLight,
        border: `1.5px solid ${COLORS.primaryBorder}`,
      }}
    >
      {(["Fixo", "Variável"] as const).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
          style={
            value === t
              ? {
                  background: COLORS.primary,
                  color: "white",
                }
              : {
                  background: "transparent",
                  color: COLORS.primary,
                }
          }
        >
          {t === "Fixo" ? (
            <Lock size={13} />
          ) : (
            <TrendingUp size={13} />
          )}

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
}: {
  onClose: () => void;
  onAdd: (g: GastoFixo) => void;
}) => {
  const [tipo, setTipo] = useState<"Fixo" | "Variável">("Fixo");
  const [familiar, setFamiliar] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [data, setData] = useState("");

  const isValid =
    familiar !== "" &&
    setor.trim() !== "" &&
    valor !== "" &&
    periodo !== "" &&
    data !== "";

  const handleSubmit = () => {
    if (!isValid) return;

    onAdd({
      nome: familiar,
      categoria: setor,
      valor: `R$${valor}`,
      parcelas: periodo,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">
            Gastos Fixos
          </h2>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: COLORS.primary }}
          >
            <X size={14} />
          </button>
        </div>

        <TipoToggle value={tipo} onChange={setTipo} />

        <div className="px-5 pb-5 flex flex-col gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <User
                size={13}
                style={{ color: COLORS.primary }}
              />
              Familiar
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
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold"
            style={
              isValid
                ? {
                    background: COLORS.primary,
                  }
                : {
                    background: "#d1d5db",
                    cursor: "not-allowed",
                  }
            }
          >
            Adicionar gasto
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
}: {
  onClose: () => void;
  onAdd: (g: GastoVariavel) => void;
}) => {
  const [tipo, setTipo] = useState<"Fixo" | "Variável">("Variável");
  const [familiar, setFamiliar] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");

  const isValid =
    familiar !== "" &&
    setor.trim() !== "" &&
    valor !== "";

  const handleSubmit = () => {
    if (!isValid) return;

    onAdd({
      nome: familiar,
      categoria: setor,
      valor: `R$${valor}`,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-800">
            Gastos Variáveis
          </h2>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white"
            style={{ background: COLORS.primary }}
          >
            <X size={14} />
          </button>
        </div>

        <TipoToggle value={tipo} onChange={setTipo} />

        <div className="px-5 pb-5 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3.5 rounded-xl text-white text-sm font-bold"
            style={
              isValid
                ? {
                    background: COLORS.primary,
                  }
                : {
                    background: "#d1d5db",
                    cursor: "not-allowed",
                  }
            }
          >
            Adicionar gasto
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────

const Card = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 ${className}`}
  >
    <div className="flex justify-center">
      <span className="bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-xl w-full text-center">
        {title}
      </span>
    </div>

    {children}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FamigestaoHome() {
  const [showModalFixos, setShowModalFixos] =
    useState(false);

  const [showModalVariaveis, setShowModalVariaveis] =
    useState(false);

  const [gastosFixos, setGastosFixos] = useState<
    GastoFixo[]
  >([
    {
      nome: "Ricardo",
      categoria: "Telefone",
      valor: "R$400,00",
      parcelas: "3 / 12",
    },
  ]);

  const [gastosVariaveis, setGastosVariaveis] =
    useState<GastoVariavel[]>([
      {
        nome: "Zilma",
        categoria: "Almoço",
        valor: "R$400,00",
      },
    ]);

  return (
    <div className="min-h-screen bg-[#e8f0ea]">
      <Header />

      <main className="p-4 flex flex-col gap-4 max-w-md mx-auto">
        <Card title="Gastos Fixos">
          <button
            onClick={() => setShowModalFixos(true)}
            className="flex items-center justify-center gap-2 bg-green-700 text-white py-2 rounded-xl"
          >
            Adicionar
            <PlusCircle size={16} />
          </button>
        </Card>

        <Card title="Gastos Variáveis">
          <button
            onClick={() => setShowModalVariaveis(true)}
            className="flex items-center justify-center gap-2 bg-green-700 text-white py-2 rounded-xl"
          >
            Adicionar
            <PlusCircle size={16} />
          </button>
        </Card>

        <Link to="/patrimonio">
          <Card title="Patrimônio">
            <p className="text-sm text-gray-600">
              Ir para patrimônio
            </p>
          </Card>
        </Link>

        <button className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl">
          <Trash2 size={16} />
          Excluir Conta
        </button>
      </main>

      {showModalFixos && (
        <GastosFixosModal
          onClose={() => setShowModalFixos(false)}
          onAdd={(novo) =>
            setGastosFixos((prev) => [...prev, novo])
          }
        />
      )}

      {showModalVariaveis && (
        <GastosVariaveisModal
          onClose={() => setShowModalVariaveis(false)}
          onAdd={(novo) =>
            setGastosVariaveis((prev) => [...prev, novo])
          }
        />
      )}
    </div>
  );
}