import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface GastosComparativoChartProps {
  totalSalario: number;
  totalFixos: number;
  totalVariaveis: number;
}

export const GastosComparativoChart = ({
  totalSalario,
  totalFixos,
  totalVariaveis,
}: GastosComparativoChartProps) => (
  <Bar
    data={{
      labels: ["Fixos", "Variáveis"],
      datasets: [
        {
          label: "Gasto",
          data: [totalFixos, totalVariaveis],
          backgroundColor: "#2D815D",
          borderRadius: 4,
          barThickness: 18,
        },
      ],
    }}
    options={{
      indexAxis: "y",
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
          max: totalSalario,
          grid: { display: false },
          ticks: {
            font: { family: "Poppins", size: 9 },
            color: "#2D815D",
            callback: (v) => `R$ ${(+v / 1000).toFixed(0)}K`,
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { family: "Poppins", size: 10 },
            color: "#2D815D",
          },
        },
      },
    }}
  />
);
