import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { GastoFixo, GastoVariavel } from "../shared/types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface GastosPorFamiliarChartProps {
  gastosFixos: GastoFixo[];
  gastosVariaveis: GastoVariavel[];
}

const parseBRL = (valor: string): number => {
  // "R$1.200,50" → 1200.50
  return parseFloat(
    valor.replace(/[R$\s.]/g, "").replace(",", ".")
  ) || 0;
};

export const GastosPorFamiliarChart = ({
  gastosFixos,
  gastosVariaveis,
}: GastosPorFamiliarChartProps) => {
  const todos = [
    ...gastosFixos.map((g) => ({ nome: g.nome, valor: parseBRL(g.valor) })),
    ...gastosVariaveis.map((g) => ({ nome: g.nome, valor: parseBRL(g.valor) })),
  ];

  const familiares = [...new Set(todos.map((g) => g.nome))];
  const totais = familiares.map((f) =>
    todos.filter((g) => g.nome === f).reduce((s, g) => s + g.valor, 0)
  );

  return (
    <Bar
      data={{
        labels: familiares,
        datasets: [
          {
            label: "Total gasto",
            data: totais,
            backgroundColor: "#2D815D",
            borderRadius: 4,
            barThickness: 20,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ` R$ ${(ctx.raw as number).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "Poppins", size: 9 },
              color: "#2D815D",
            },
          },
          y: {
            grid: { color: "#eeeeee" },
            ticks: {
              font: { family: "Poppins", size: 9 },
              color: "#2D815D",
              callback: (v) => `R$ ${(+v / 1000).toFixed(0)}K`,
            },
          },
        },
      }}
    />
  );
};
