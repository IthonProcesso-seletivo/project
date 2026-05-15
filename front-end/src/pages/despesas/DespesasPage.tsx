import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu, SlidersHorizontal } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Despesa {
  nome: string;
  setor: string;
  familiar: string;
  tipo: "Fixo" | "Variável";
  gasto: number;
}

type FiltroTipo = "Todos" | "Fixo" | "Variável";

// ─── Constants ────────────────────────────────────────────────────────────────
const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const MOCK_DESPESAS: Despesa[] = [
  { nome: "Computador", setor: "Outros",     familiar: "Lucas",   tipo: "Fixo",     gasto: 2000 },
  { nome: "Vestido",    setor: "Roupas",     familiar: "Helena",  tipo: "Variável", gasto: 150  },
];

const CORES_DONUT = ["#D9D9D9", "#6B2E82", "#93D7BA", "#2D815D", "#89BFA1"];

const P: React.CSSProperties = { fontFamily: "Poppins, sans-serif" };

const SHADOW_DEFAULT  = "2px 2px 4px rgba(0,0,0,0.15)";
const SHADOW_BTN_MES  = "0px 4px 4px rgba(0,0,0,0.15)";
const SHADOW_MES_TEXT = "0px 0px 4px rgba(0,0,0,0.15)";

// Largura reservada ao botão Filtrar — usada como espaçador nas linhas de dados
const FILTER_COL_W = 96;

// Proporção das colunas compartilhada entre header e linhas
const COL_GRID = "1.2fr 1fr 1fr 1fr 1fr";

// Legendas dos eixos — Poppins Light 10px, cor #D9D9D9
const AXIS_TITLE = (text: string) => ({
  display: true,
  text,
  color: "#93D7BA",
  font: { family: "Poppins", size: 10, weight: 300 },
});

// ─── Chart: Gastos — barra horizontal ────────────────────────────────────────
function GastosChart({ despesas }: { despesas: Despesa[] }) {
  const fixos     = despesas.filter(d => d.tipo === "Fixo").reduce((s, d) => s + d.gasto, 0);
  const variaveis = despesas.filter(d => d.tipo === "Variável").reduce((s, d) => s + d.gasto, 0);

  return (
    <Bar
      data={{
        labels: ["Fixos", "Variáveis"],
        datasets: [{
          data: [fixos, variaveis],
          backgroundColor: "#2D815D",
          borderRadius: 4,
          barThickness: 18,
        }],
      }}
      options={{
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx =>
                ` R$ ${(ctx.raw as number).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            title: AXIS_TITLE("Gastos"),
            ticks: {
              font: { family: "Poppins", size: 9 },
              color: "#2D815D",
              callback: v => `${+v / 1000}K`,
            },
          },
          y: {
            grid: { display: false },
            title: AXIS_TITLE("Tipo"),
            ticks: {
              font: { family: "Poppins", size: 10 },
              color: "#2D815D",
            },
          },
        },
      }}
    />
  );
}

// ─── Chart: Classificação Familiar — barra vertical ──────────────────────────
function ClassificacaoChart({ despesas }: { despesas: Despesa[] }) {
  const familiares = [...new Set(despesas.map(d => d.familiar))];
  const totais     = familiares.map(f =>
    despesas.filter(d => d.familiar === f).reduce((s, d) => s + d.gasto, 0),
  );

  return (
    <Bar
      data={{
        labels: familiares,
        datasets: [{
          data: totais,
          backgroundColor: "#2D815D",
          borderRadius: 4,
          barThickness: 20,
        }],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx =>
                ` R$ ${(ctx.raw as number).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            title: AXIS_TITLE("Familiar"),
            ticks: {
              font: { family: "Poppins", size: 9 },
              color: "#2D815D",
            },
          },
          y: {
            grid: { color: "#eeeeee" },
            title: AXIS_TITLE("Gastos"),
            ticks: {
              font: { family: "Poppins", size: 9 },
              color: "#2D815D",
              callback: v => `${+v / 1000}K`,
            },
          },
        },
      }}
    />
  );
}

// ─── Legenda customizada do gráfico Setores ───────────────────────────────────
function SetoresLegend({ labels, cores }: { labels: string[]; cores: string[] }) {
  return (
    <div className="flex flex-col gap-1.5 justify-center shrink-0">
      {labels.map((label, i) => (
        <div
          key={label}
          className="flex items-center gap-1.5 px-2 py-1"
          style={{ borderRadius: 6 }}
        >
          <span
            className="rounded-sm shrink-0"
            style={{ width: 10, height: 10, background: cores[i], display: "inline-block", border: "1px solid #2D815D" }}
          />
          <span style={{ ...P, fontSize: 10, fontWeight: 300, color: "#2D815D" }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Chart: Setores — donut ───────────────────────────────────────────────────
function SetoresChart({ despesas }: { despesas: Despesa[] }) {
  const setores = [...new Set(despesas.map(d => d.setor))];
  const totais  = setores.map(s =>
    despesas.filter(d => d.setor === s).reduce((acc, d) => acc + d.gasto, 0),
  );
  const cores = CORES_DONUT.slice(0, setores.length);

  return (
    <div className="flex items-center gap-2 h-full">
      <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
        <Doughnut
          data={{
            labels: setores,
            datasets: [{ data: totais, backgroundColor: cores, borderWidth: 0 }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: { legend: { display: false } },
          }}
        />
      </div>
      <SetoresLegend labels={setores} cores={cores} />
    </div>
  );
}

// ─── ChartCard ────────────────────────────────────────────────────────────────
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-white flex flex-col gap-3 p-3"
      style={{
        borderRadius: 16,
        border: "1px solid #2D815D",
        boxShadow: SHADOW_DEFAULT,
      }}
    >
      {/* Centralizado sem ocupar 100% da largura */}
      <div className="flex justify-center">
        <span
          className="bg-[#2D815D] text-white py-1.5 px-5"
          style={{ ...P, fontSize: 15, fontWeight: 500, borderRadius: 28 }}
        >
          {title}
        </span>
      </div>
      <div style={{ height: 150 }}>{children}</div>
    </div>
  );
}

// ─── DespesasPage ─────────────────────────────────────────────────────────────
export default function DespesasPage() {
  const [mesIndex,   setMesIndex]   = useState(4);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("Todos");

  const despesas =
    filtroTipo === "Todos"
      ? MOCK_DESPESAS
      : MOCK_DESPESAS.filter(d => d.tipo === filtroTipo);

  const fmtBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const COLUNAS = ["Nome:", "Setor:", "Familiar:", "Tipo:", "Gasto:"];

  return (
    <div className="min-h-screen bg-[#EAF0EA]" style={P}>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav
        className="bg-[#2D815D] px-4 sm:px-8 flex items-center justify-between shadow-md"
        style={{ minHeight: 72 }}
      >
        <div className="flex items-center gap-3">
          <div className="" style={{ borderRadius: 12 }}>
            <img
              src="/src/assets/Logo.png"
              alt="Logo FamiGestão"
              className="h-20 w-20 object-contain"
              onError={() => {}}
            />
          </div>

        </div>

        {/* Desktop */}
        <div
          className="hidden sm:flex items-center bg-[#89BFA1] p-1 gap-1"
          style={{ borderRadius: 16 }}
        >
          <a
            href="/"
            className="px-8 py-2 text-green-900 hover:bg-white/10 transition-colors hover:text-white"
            style={{ ...P, fontSize: 15, fontWeight: 500, borderRadius: 16 }}
          >
            Home
          </a>
          <span
            className="px-8 py-2 bg-[#2D815D] text-white"
            style={{ ...P, fontSize: 15, fontWeight: 600, borderRadius: 16 }}
          >
            Despesas
          </span>
        </div>

        {/* Mobile */}
        <button
          className="sm:hidden text-white p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="sm:hidden bg-[#2D815D] px-6 pb-4 flex flex-col">
          <a href="/" className="text-white py-3 text-sm border-b border-white/20" style={P}>
            Home
          </a>
          <span className="text-white py-3 text-sm font-semibold" style={P}>
            Despesas
          </span>
        </div>
      )}

      {/* ── Conteúdo ────────────────────────────────────────────────────── */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto flex flex-col gap-6">

        {/* Título: centralizado no mobile, à esquerda no desktop */}
        <h1
          className="text-[#2D815D] text-center sm:text-left"
          style={{ ...P, fontSize: 35, fontWeight: 600 }}
        >
          Despesas
        </h1>

        {/* ── Card principal ───────────────────────────────────────────── */}
        <div
          className="bg-white p-4 flex flex-col gap-3"
          style={{
            borderRadius: 32,
            border: "1px solid #2D815D",
            boxShadow: SHADOW_DEFAULT,
          }}
        >
          <div className="overflow-x-auto">
            <div style={{ minWidth: 520 }}>

              {/* Header verde */}
              <div
                className="bg-[#2D815D] flex items-center px-4 py-2.5 gap-3 mb-3"
                style={{ borderRadius: 23 }}
              >
                <div className="flex-1 grid text-white" style={{ gridTemplateColumns: COL_GRID }}>
                  {COLUNAS.map(col => (
                    <span key={col} style={{ ...P, fontSize: 15, fontWeight: 500 }}>
                      {col}
                    </span>
                  ))}
                </div>

                {/* Filtrar: ícone no mobile, texto+ícone no desktop */}
                <div className="relative shrink-0" style={{ width: FILTER_COL_W }}>
                  <button
                    onClick={() => setShowFilter(o => !o)}
                    className="w-full flex items-center justify-center gap-2 bg-[#89BFA1] hover:opacity-90 active:scale-95 transition-all py-1.5 px-3"
                    style={{ ...P, fontSize: 15, fontWeight: 500, borderRadius: 16, color: "#103B22" }}
                  >
                    <span className="hidden sm:inline">Filtrar</span>
                    <SlidersHorizontal className="inline sm:hidden"size={14} color="#103B22" />
                  </button>

                  {showFilter && (
                    <div
                      className="absolute right-0 top-10 bg-white shadow-lg border border-gray-100 z-20 min-w-[150px]"
                      style={{ borderRadius: 16 }}
                    >
                      {(["Todos", "Fixo", "Variável"] as FiltroTipo[]).map(op => (
                        <button
                          key={op}
                          onClick={() => { setFiltroTipo(op); setShowFilter(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#EAF0EA] transition-colors ${
                            filtroTipo === op ? "text-[#2D815D] font-semibold" : "text-gray-500"
                          }`}
                          style={P}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Área interna: borda #B6C7BC, fundo #F7FAF8, sem sombra própria */}
              <div
                style={{
                  border: "1px solid #B6C7BC",
                  borderRadius: 16,
                  background: "#F7FAF8",
                  overflow: "hidden",
                }}
              >
                {despesas.length === 0 ? (
                  <p className="text-center text-gray-400 py-8 text-sm" style={P}>
                    Nenhuma despesa encontrada.
                  </p>
                ) : (
                  despesas.map((d, i) => (
                    <div key={i}>
                      {/*
                        Linha de dados — mesma estrutura flex do header:
                          flex-1 grid (colunas) + espaçador FILTER_COL_W
                        Isso alinha as colunas precisamente com o header acima.
                      */}
                      <div className="flex items-center px-4 py-3">
                        <div className="flex-1 grid" style={{ gridTemplateColumns: COL_GRID }}>
                          <span className="text-gray-800" style={{ ...P, fontSize: 15 }}>
                            {d.nome}
                          </span>
                          <span className="text-gray-600" style={{ ...P, fontSize: 15 }}>
                            {d.setor}
                          </span>
                          <span className="text-gray-600" style={{ ...P, fontSize: 15 }}>
                            {d.familiar}
                          </span>
                          <span className="text-gray-600" style={{ ...P, fontSize: 15 }}>
                            {d.tipo}
                          </span>
                          <span className="text-gray-800 font-medium" style={{ ...P, fontSize: 15 }}>
                            {fmtBRL(d.gasto)}
                          </span>
                        </div>
                        {/* Espaçador espelha a largura do botão Filtrar */}
                        <div style={{ width: FILTER_COL_W, flexShrink: 0 }} />
                      </div>

                      {/* Divisória curta #D9D9D9 */}
                      {i < despesas.length - 1 && (
                        <div style={{ height: 3, background: "#D9D9D9", margin: "0 16px" }} />
                      )}
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ── Relatório mensal ─────────────────────────────────────────── */}
        <div
          className="p-4 flex flex-col gap-5"
          style={{ borderRadius: 32,}}
        >
          <div className="flex justify-center">
            <span
              className="bg-[#2D815D] text-white py-2 px-8"
              style={{ ...P, fontSize: 15, fontWeight: 500, borderRadius: 28, boxShadow: SHADOW_BTN_MES}}
            >
              Relatório mensal de gastos
            </span>
          </div>

          {/*
            Navegação de mês — responsiva:
            - Botões: shrink-0 (tamanho fixo, nunca encolhem)
            - Texto: flex-1 (ocupa espaço disponível entre os botões)
            - font-size: clamp() — escala com a viewport, nunca transborda
          */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 w-full px-2">
            <button
              onClick={() => setMesIndex(i => (i - 1 + 12) % 12)}
              className="shrink-0 rounded-full bg-[#2D815D] text-white flex items-center justify-center hover:bg-[#103B22] active:scale-95 transition-all"
              style={{ width: 36, height: 36, textShadow: SHADOW_BTN_MES }}
              aria-label="Mês anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <span
              className="text-[#2D815D] text-center flex-1 sm:flex-none"
              style={{
                ...P,
                fontSize: "clamp(14px, 4vw, 23px)",
                fontWeight: 500,
                textShadow: SHADOW_MES_TEXT,
                borderRadius: 8,
                padding: "2px 12px",
                display: "inline-block",
              }}
            >
              {MESES[mesIndex].toUpperCase()}
            </span>

            <button
              onClick={() => setMesIndex(i => (i + 1) % 12)}
              className="shrink-0 rounded-full bg-[#2D815D] text-white flex items-center justify-center hover:bg-[#103B22] active:scale-95 transition-all"
              style={{ width: 36, height: 36, boxShadow: SHADOW_BTN_MES }}
              aria-label="Próximo mês"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Gráficos: 1 col mobile / 3 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ChartCard title="Gastos">
              <GastosChart despesas={despesas} />
            </ChartCard>
            <ChartCard title="Classificação Familiar">
              <ClassificacaoChart despesas={despesas} />
            </ChartCard>
            <ChartCard title="Setores">
              <SetoresChart despesas={despesas} />
            </ChartCard>
          </div>
        </div>

      </main>
    </div>
  );
}