import type { GastoFixo, GastoVariavel } from "../shared/types";
import { GastosComparativoChart } from "../charts/GastosComparativoChart";

interface SalarioGastoContentProps {
  gastosFixos: GastoFixo[];
  gastosVariaveis: GastoVariavel[];
  totalSalario: number;
}

const parseBRL = (valor: string): number =>
  parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;

export const SalarioGastoContent = ({
  gastosFixos,
  gastosVariaveis,
  totalSalario,
}: SalarioGastoContentProps) => {
  const totalFixos = gastosFixos.reduce((s, g) => s + parseBRL(g.valor), 0);
  const totalVariaveis = gastosVariaveis.reduce((s, g) => s + parseBRL(g.valor), 0);

  return (
    <div style={{ height: 150 }}>
      <GastosComparativoChart
        totalSalario={totalSalario}
        totalFixos={totalFixos}
        totalVariaveis={totalVariaveis}
      />
    </div>
  );
};
