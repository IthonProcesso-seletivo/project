import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SaldoDonutChartProps {
  total: number;
  gasto: number;
}

export const SaldoDonutChart = ({ total, gasto }: SaldoDonutChartProps) => {
  const restante = Math.max(total - gasto, 0);

  return (
    <div className="flex flex-col items-center gap-3">
      <div style={{ width: 140, height: 140 }}>
        <Doughnut
          data={{
            labels: ["Disponível", "Gasto"],
            datasets: [
              {
                data: [restante, gasto],
                backgroundColor: ["#16a34a", "#ef4444"],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            cutout: "65%",
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
          }}
        />
      </div>
      <div className="flex flex-col gap-1.5 text-xs self-start px-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-600 inline-block shrink-0" />
          Total disponível: R$ {restante.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block shrink-0" />
          Total gasto: R$ {gasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};
