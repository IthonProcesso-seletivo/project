import React, { useState, useRef, useEffect } from "react";
import famigestaoLogo from "./assets/famigestao-logo.png";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Constants & Types ────────────────────────────────────────────────────────

const COLORS = {
  primary: "#2D815D",
  primaryDark: "#1e5c40",
  primaryLight: "#EAF0EA",
  primaryBorder: "#c2d9cb",
  primaryMuted: "#a8c9b5",
} as const;

type PatrimonioTipo =
  | ""
  | "Imóvel"
  | "Veículo"
  | "Investimento"
  | "Equipamento"
  | "Outros";

type NavItem = "Home" | "Despesas";

const TIPOS: PatrimonioTipo[] = [
  "Imóvel",
  "Veículo",
  "Investimento",
  "Equipamento",
  "Outros",
];

interface FormState {
  tipo: PatrimonioTipo;
  nome: string;
  valor: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const BoxIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.primary}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const TypeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.primary}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
    <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2Z" />
  </svg>
);

const NameIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.primary}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const ValueIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke={COLORS.primary}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
    <path d="M12 18V6" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 200ms ease",
    }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#374151"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

// ─── Logo ─────────────────────────────────────────────────────────────────────

const FamigestaoLogo = () => (
  <img
    src={famigestaoLogo}
    alt="Famigestão"
    style={{ height: 44, width: "auto", objectFit: "contain" }}
  />
);

// ─── UI Primitives ────────────────────────────────────────────────────────────

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FormField = ({ label, icon, children }: FormFieldProps) => (
  <div>
    <label
      style={{ color: "#374151" }}
      className="flex items-center gap-1.5 text-xs font-semibold mb-2"
    >
      {icon}
      {label}
    </label>
    {children}
  </div>
);

// ─── Text Input ───────────────────────────────────────────────────────────────

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextInput = ({ value, onChange, placeholder }: TextInputProps) => (
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

// ─── Currency Input ───────────────────────────────────────────────────────────

interface CurrencyInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput = ({ value, onChange }: CurrencyInputProps) => (
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

// ─── Submit Button ────────────────────────────────────────────────────────────

interface SubmitButtonProps {
  isValid: boolean;
  submitted: boolean;
  onClick: () => void;
}

const SubmitButton = ({ isValid, submitted, onClick }: SubmitButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!isValid}
    className="w-full py-4 mt-1 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2.5 tracking-wide border-none transition-all duration-200"
    style={
      isValid
        ? {
            background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
            cursor: "pointer",
          }
        : {
            background: "#d1d5db",
            cursor: "not-allowed",
          }
    }
  >
    {submitted ? "Cadastrado com sucesso!" : "Confirmar Cadastro"}
    <CheckIcon />
  </button>
);

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  value: PatrimonioTipo;
  onChange: (v: PatrimonioTipo) => void;
}

const Dropdown = ({ value, onChange }: DropdownProps) => {
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

// ─── Nav Routes ───────────────────────────────────────────────────────────────

const NAV_ROUTES: Record<NavItem, string> = {
  Home: "/",
  Despesas: "/despesas",
};

// ─── Nav Button ───────────────────────────────────────────────────────────────

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const NavButton = ({ label, isActive, onClick, icon }: NavButtonProps) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-none"
    style={
      isActive
        ? { background: COLORS.primary , color: "white" }
        : { background: "transparent", color: "rgb(255, 255, 255)" }
    }
    onMouseEnter={(e) => {
      if (!isActive) e.currentTarget.style.color = "white";
    }}
    onMouseLeave={(e) => {
      if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.75)";
    }}
  >
    {icon}
    {label}
  </button>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // FIX: "/" só faz match exato; outras rotas usam startsWith
  const activeNav =
    (Object.entries(NAV_ROUTES) as [NavItem, string][])
      .find(([, path]) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path)
      )?.[0] ?? "Home";

  return (
    <nav
      className="h-16 px-8 flex items-center justify-between shadow-md"
      style={{ background: COLORS.primary }}
    >
      <FamigestaoLogo />

      <div
        className="flex gap-1 rounded-xl p-1"
        style={{ background: "#89BFA1" }}
      >
        {(["Home", "Despesas"] as NavItem[]).map((nav) => (
          <NavButton
            key={nav}
            label={nav}
            isActive={activeNav === nav}
            onClick={() => navigate(NAV_ROUTES[nav])}
            icon={nav === "Home" ? <HomeIcon /> : undefined}
          />
        ))}
      </div>
    </nav>
  );
};

// ─── Back Button ──────────────────────────────────────────────────────────────

// FIX: adicionada prop onClick
interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-8 left-8 w-10 h-10 rounded-xl border bg-white flex items-center justify-center"
    style={{ borderColor: COLORS.primaryBorder }}
  >
    <ArrowLeftIcon />
  </button>
);

// ─── Card Header ─────────────────────────────────────────────────────────────

const CardHeader = () => (
  <div className="text-center mb-7">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
      style={{
        background: COLORS.primaryLight,
        border: `2px solid ${COLORS.primaryBorder}`,
      }}
    >
      <BoxIcon />
    </div>
    <h1 className="text-xl font-bold text-gray-800 tracking-tight">
      Cadastrar Patrimônio
    </h1>
    <p className="text-sm text-gray-500 mt-2">
      Preencha as informações para adicionar um novo patrimônio.
    </p>
  </div>
);

// ─── Patrimônio Form ──────────────────────────────────────────────────────────

interface PatrimonioFormProps {
  form: FormState;
  submitted: boolean;
  isValid: boolean;
  onTipoChange: (v: PatrimonioTipo) => void;
  onNomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const PatrimonioForm = ({
  form,
  submitted,
  isValid,
  onTipoChange,
  onNomeChange,
  onValorChange,
  onSubmit,
}: PatrimonioFormProps) => (
  <div className="flex flex-col gap-5">
    <FormField label="Tipo" icon={<TypeIcon />}>
      <Dropdown value={form.tipo} onChange={onTipoChange} />
    </FormField>

    <FormField label="Nome" icon={<NameIcon />}>
      <TextInput
        value={form.nome}
        onChange={onNomeChange}
        placeholder="Digite o nome do patrimônio"
      />
    </FormField>

    <FormField label="Valor" icon={<ValueIcon />}>
      <CurrencyInput value={form.valor} onChange={onValorChange} />
    </FormField>

    <SubmitButton isValid={isValid} submitted={submitted} onClick={onSubmit} />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CadastrarPatrimonio() {
  const [form, setForm] = useState<FormState>({ tipo: "", nome: "", valor: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) return "";
    const num = parseFloat(digits) / 100;
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, valor: formatCurrency(e.target.value) }));
  };

  const handleSubmit = () => {
    if (!form.tipo || !form.nome || !form.valor) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ tipo: "", nome: "", valor: "" });
    }, 2500);
  };

  const isValid =
    form.tipo !== "" && form.nome.trim() !== "" && form.valor !== "";

  return (
    <div
      className="min-h-screen flex flex-col font-sans"
      style={{ background: COLORS.primaryLight }}
    >
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10 relative">
        <BackButton onClick={() => navigate(-1)} />

        <div className="bg-white rounded-2xl px-10 py-10 w-full max-w-md shadow-xl">
          <CardHeader />

          <PatrimonioForm
            form={form}
            submitted={submitted}
            isValid={isValid}
            onTipoChange={(v) => setForm((f) => ({ ...f, tipo: v }))}
            onNomeChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            onValorChange={handleValorChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
