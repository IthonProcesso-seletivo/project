import { useState } from "react";
import { PlusCircle, Trash2, Menu } from "lucide-react";
import famigestaoLogo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const COLORS = {
  primary: "#2D815D",
  primaryDark: "#1e5c40",
  primaryLight: "#EAF0EA",
  primaryBorder: "#c2d9cb",
  primaryMuted: "#a8c9b5",
} as const;

const DonutChart = ({ total, spent }) => {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(spent / total, 1);
  const spentDash = pct * circ;
  const availDash = circ - spentDash;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#d1fae5"
          strokeWidth="18"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#16a34a"
          strokeWidth="18"
          strokeDasharray={`${availDash} ${spentDash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="18"
          strokeDasharray={`${spentDash} ${availDash}`}
          strokeDashoffset={circ / 4 - availDash}
          strokeLinecap="round"
        />
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

const HorizontalBar = ({ label, value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gray-500 w-16 text-right shrink-0">
        {label}
      </span>
      <div className="flex-1 bg-gray-100 rounded-sm h-5 overflow-hidden">
        <div
          className="h-full rounded-sm transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 ${className}`}
  >
    <div className="flex justify-center">
      <span className="bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-xl tracking-wide shadow-sm w-full text-center">
        {title}
      </span>
    </div>
    {children}
  </div>
);

const AddButton = ({ label }) => (
  <button className="mt-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl w-full transition-all duration-150 shadow-sm">
    {label} <PlusCircle size={16} />
  </button>
);

const GastosFixosContent = ({ gastosFixos }) => (
  <div className="flex-1 space-y-1">
    {gastosFixos.map((g, i) => (
      <div
        key={i}
        className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0 gap-2"
      >
        <span className="w-16 font-medium text-gray-800 shrink-0">
          {g.nome}
        </span>
        <span className="flex-1 text-center text-gray-600">{g.categoria}</span>
        <span className="text-gray-800 font-medium shrink-0">{g.valor}</span>
        <span className="text-xs text-gray-500 w-10 text-right shrink-0">
          {g.parcelas}
        </span>
      </div>
    ))}
  </div>
);

const GastosVariaveisContent = ({ gastosVariaveis }) => (
  <div className="flex-1 space-y-1">
    {gastosVariaveis.map((g, i) => (
      <div
        key={i}
        className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0 gap-2"
      >
        <span className="w-16 font-medium text-gray-800 shrink-0">
          {g.nome}
        </span>
        <span className="flex-1 text-center text-gray-600">{g.categoria}</span>
        <span className="text-gray-800 font-medium text-right shrink-0">
          {g.valor}
        </span>
      </div>
    ))}
  </div>
);

const PatrimonioContent = ({ patrimonio }) => (
  <>
    <div className="grid grid-cols-3 text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-3 py-1.5 bg-green-50">
      <span>Valor</span>
      <span className="text-center">Tipo</span>
      <span className="text-right">Nome</span>
    </div>
    <div className="flex-1">
      {patrimonio.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-3 items-center text-sm text-gray-700 py-2.5 border-b border-gray-100 last:border-0"
        >
          <span className="text-gray-800 font-medium text-xs">
            {item.valor}
          </span>
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
      {["4K", "8K", "12K", "16K", "20k"].map((v) => (
        <span key={v}>{v}</span>
      ))}
    </div>
  </div>
);

export default function FamigestaoHome() {
  const [activeTab, setActiveTab] = useState("home");

  const patrimonio = [
    { valor: "R$1.000.000,00", tipo: "Casa", nome: "Helena" },
    { valor: "R$100.000,00", tipo: "Carro", nome: "Ricardo" },
  ];

  const gastosFixos = [
    {
      nome: "Ricardo",
      categoria: "Telefone",
      valor: "R$400,00",
      parcelas: "3 / 12",
    },
    {
      nome: "Lucas",
      categoria: "Faculdade",
      valor: "R$900,00",
      parcelas: "2 / 6",
    },
  ];

  const gastosVariaveis = [
    { nome: "Zilma", categoria: "Almoço", valor: "R$400,00" },
    { nome: "Helena", categoria: "shopping", valor: "R$900,00" },
  ];

  return (
    <div className="min-h-screen bg-[#e8f0ea] font-['DM_Sans',sans-serif]">
      {/* Navbar */}
      <nav
        className="min-h-[110px] px-8 flex items-center justify-between shadow-md"
        style={{ background: COLORS.primary }}
      >
        <div className="flex items-center gap-2">
          <Link to="/home">
            <img
              className="h-[100px] w-auto object-contain"
              src={famigestaoLogo}
              alt="Famigestão"
              // style={{ height: 44, width: "auto", objectFit: "contain" }}
            />
          </Link>
        </div>

        {/* Desktop: Home + Menu pills */}
        <div className="min-w-[300px] min-h-[60px] bg-[#89BFA1] p-[3px] flex items-center justify-between rounded-xl">
          <Link
            className={"bg-[" + COLORS.primary + "] min-h-[50px] min-w-[150px] mr-1 text-white font-semibold rounded-xl flex items-center justify-center"}
            to="/home"
          >
            Home
          </Link>
          <div>
            <Link
              className={
                "min-h-[50px] min-w-[150px] ml-1 text-white font-semibold rounded-xl flex items-center justify-center"
              }
              to="/despesas"
            >
              Despesas
            </Link>
          </div>
        </div>

        {/* Mobile: hamburger */}
        <button className="sm:hidden text-white" onClick={() => setActiveTab(activeTab === "menu" ? "home" : "menu")}>
          <Menu size={22} />
        </button>
      </nav>

      {/* ── MOBILE layout (< lg) ─────────────────────────────────────────── */}
      {/* Order: Salário Restante → Salário Gasto → Gastos Fixos → Gastos Variáveis → Patrimônio */}
      <main className="lg:hidden p-4 flex flex-col gap-4 max-w-md mx-auto">
        <Card title="Salário Restante">
          <DonutChart total={2500} spent={500} />
        </Card>

        <Card title="Salário Gasto">
          <SalarioGastoContent />
        </Card>

        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" />
        </Card>

        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" />
        </Card>

        <Card title="Patrimônio">
          <PatrimonioContent patrimonio={patrimonio} />
          <AddButton label="Adicionar Patrimônio" />
        </Card>

        <div className="flex justify-end pb-2">
          <button className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95">
            <Trash2 size={15} /> Excluir Conta
          </button>
        </div>
      </main>

      {/* ── DESKTOP layout (lg+) ─────────────────────────────────────────── */}
      {/*
        Grid 3 cols × 2 rows:
          [Patrimônio row-span-2] [Gastos Fixos    ] [Salário Restante]
          [                     ] [Gastos Variáveis] [Salário Gasto   ]
      */}
      <main
        className="hidden lg:grid p-5 gap-4 max-w-5xl mx-auto"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
        }}
      >
        {/* Col 1 — Patrimônio (rows 1-2) */}
        <Card title="Patrimônio" className="row-span-2">
          <PatrimonioContent patrimonio={patrimonio} />
          <AddButton label="Adicionar Patrimônio" />
        </Card>

        {/* Col 2, Row 1 — Gastos Fixos */}
        <Card title="Gastos Fixos">
          <GastosFixosContent gastosFixos={gastosFixos} />
          <AddButton label="Adicionar Gastos Fixos" />
        </Card>

        {/* Col 3, Row 1 — Salário Restante */}
        <Card title="Salário Restante">
          <DonutChart total={2500} spent={500} />
        </Card>

        {/* Col 2, Row 2 — Gastos Variáveis */}
        <Card title="Gastos Variáveis">
          <GastosVariaveisContent gastosVariaveis={gastosVariaveis} />
          <AddButton label="Adicionar Gastos Variáveis" />
        </Card>

        {/* Col 3, Row 2 — Salário Gasto */}
        <Card title="Salário Gasto">
          <SalarioGastoContent />
        </Card>
      </main>

      {/* Footer desktop */}
      <div className="hidden lg:flex justify-end px-5 pb-5 max-w-5xl mx-auto">
        <button className="flex items-center gap-2 bg-green-700 hover:bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow transition-all duration-200 active:scale-95">
          <Trash2 size={15} /> Excluir Conta
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
