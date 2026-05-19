import type { GastoFixo } from "../shared/types";

interface GastosFixosContentProps {
  gastosFixos: GastoFixo[];
}

export const GastosFixosContent = ({ gastosFixos }: GastosFixosContentProps) => (
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
