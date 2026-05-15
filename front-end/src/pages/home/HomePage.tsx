import { useState } from "react";
import { PlusCircle, Trash2, Home, Menu, TrendingUp } from "lucide-react";

const Colors = {
  Primaria: "#2D815D";
  

};

const DonutChart = ({ total, spent }) => {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(spent / total, 1);
  const spentDash = pct * circ;
  const availDash = circ - spentDash;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#d1fae5" strokeWidth="18" />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke="#16a34a" strokeWidth="18"
          strokeDasharray={`${availDash} ${spentDash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <circle
          cx="70" cy="70" r={radius} fill="none"
          stroke="#ef4444" strokeWidth="18"
          strokeDasharray={`${spentDash} ${availDash}`}
          strokeDashoffset={circ / 4 - availDash}
          strokeLinecap="round"
        />
        <text x="70" y="66" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="700" fontFamily="'DM Sans', sans-serif">
          R${(total - spent).toLocaleString("pt-BR")}
        </text>
        <text x="70" y="82" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="'DM Sans', sans-serif">
          disponível
        </text>
      </svg>
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" />Total disponível: {total}</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Total gasto: {spent}</span>
      </div>
    </div>
  );
};

const HorizontalBar = ({ label, value, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-xs text-gray-500 w-16 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs text-gray-600 w-10 text-right shrink-0">R${(value / 1000).toFixed(0)}K</span>
    </div>
  );
};

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-green-50 p-4 flex flex-col gap-3 ${className}`}>
    <div className="flex justify-center">
      <span className="bg-green-700 text-white text-sm font-semibold px-5 py-1.5 rounded-full tracking-wide shadow-sm">
        {title}
      </span>
    </div>
    {children}
  </div>
);

const TableRow = ({ cols }) => (
  <div className="flex items-center justify-between text-sm text-gray-700 py-2 border-b border-gray-50 last:border-0">
    {cols.map((col, i) => (
      <span key={i} className={`${i === 0 ? "w-24" : "flex-1 text-center"} ${i === cols.length - 1 ? "text-right font-medium text-green-800" : ""}`}>
        {col}
      </span>
    ))}
  </div>
);

const AddButton = ({ label }) => (
  <button className="mt-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl w-full transition-all duration-150 shadow-sm">
    {label} <PlusCircle size={16} />
  </button>
);

export default function FamigestaoHome() {
  const [activeTab, setActiveTab] = useState("home");

  const patrimonio = [
    { valor: "R$1.000.000,00", tipo: "Casa", nome: "Helena" },
    { valor: "R$100.000,00", tipo: "Carro", nome: "Ricardo" },
  ];

  const gastosFixos = [
    { nome: "Ricardo", categoria: "Telefone", valor: "R$400,00", parcelas: "3 / 12" },
    { nome: "Lucas", categoria: "Faculdade", valor: "R$900,00", parcelas: "2 / 6" },
  ];

  const gastosVariaveis = [
    { nome: "Zilma", categoria: "Almoço", valor: "R$400,00" },
    { nome: "Helena", categoria: "shopping", valor: "R$900,00" },
  ];

  return (
    <div className="min-h-screen bg-[#e8f0ea] font-['DM_Sans',sans-serif]">
      {/* Navbar */}
      <nav className="bg-green-800 px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <img src="../assets/Logo.png" alt="logo do site" />
        </div>
        <div className="flex bg-white/10 rounded-full p-1 gap-1">
          {[{ key: "home", icon: <Home size={14} />, label: "Home" }, { key: "menu", icon: <Menu size={14} />, label: "Menu" }].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === tab.key ? "bg-white text-green-800 shadow" : "text-white/80 hover:text-white"}`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Grid */}
      <main className="p-5 grid grid-cols-3 grid-rows-2 gap-4 max-w-5xl mx-auto">

        {/* Patrimônio */}
        <Card title="Patrimônio" className="row-span-2">
          <div className="grid grid-cols-3 text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-3 py-1.5 bg-green-50">
            <span>Valor</span>
            <span className="text-center">Tipo</span>
            <span className="text-right">Nome</span>
          </div>
          <div className="flex-1">
            {patrimonio.map((item, i) => (
              <div key={i} className="grid grid-cols-3 items-center text-sm text-gray-700 py-2.5 border-b border-gray-100 last:border-0">
                <span className="text-green-800 font-medium text-xs">{item.valor}</span>
                <span className="text-center">{item.tipo}</span>
                <span className="text-right">{item.nome}</span>
              </div>
            ))}
          </div>
          <AddButton label="Adicionar Patrimônio" />
        </Card>

        {/* Gastos Fixos */}
        <Card title="Gastos Fixos">
          <div className="flex-1 space-y-1">
            {gastosFixos.map((g, i) => (
              <div key={i} className="flex items-center justify-between text-sm text-gray-700 py-2 border-b border-gray-50 last:border-0">
                <span className="w-20 font-medium text-gray-800">{g.nome}</span>
                <span className="flex-1 text-center text-gray-500">{g.categoria}</span>
                <span className="text-green-800 font-semibold w-20 text-right">{g.valor}</span>
                <span className="text-xs text-gray-400 w-12 text-right">{g.parcelas}</span>
              </div>
            ))}
          </div>
          <AddButton label="Adicionar Gastos Fixos" />
        </Card>

        {/* Salário Restante */}
        <Card title="Salário Restante">
          <DonutChart total={2500} spent={500} />
        </Card>

        {/* Gastos Variáveis */}
        <Card title="Gastos Variáveis">
          <div className="flex-1 space-y-1">
            {gastosVariaveis.map((g, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                <span className="w-20 font-medium text-gray-800">{g.nome}</span>
                <span className="flex-1 text-center text-gray-500">{g.categoria}</span>
                <span className="text-green-800 font-semibold text-right">{g.valor}</span>
              </div>
            ))}
          </div>
          <AddButton label="Adicionar Gastos Variáveis" />
        </Card>

        {/* Salário Gasto */}
        <Card title="Salário Gasto">
          <div className="flex-1 px-2 pt-1">
            <HorizontalBar label="Fixos" value={18000} max={20000} color="#16a34a" />
            <HorizontalBar label="Variáveis" value={9000} max={20000} color="#16a34a" />
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
              {["4K", "8K", "12K", "16K", "20K"].map(v => <span key={v}>{v}</span>)}
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <div className="flex justify-end px-5 pb-5 max-w-5xl mx-auto">
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
