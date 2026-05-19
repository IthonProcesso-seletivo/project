import type { GastoVariavel } from "../shared/types";

interface GastosVariaveisContentProps {
  gastosVariaveis: GastoVariavel[];
}

export const GastosVariaveisContent = ({ gastosVariaveis }: GastosVariaveisContentProps) => (
  <div className="flex-1 space-y-1">
    {gastosVariaveis.map((g, i) => (
      <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0 gap-2">
        <span className="w-16 font-medium text-gray-800 shrink-0">{g.nome}</span>
        <span className="flex-1 text-center text-gray-600">{g.categoria}</span>
        <span className="text-gray-800 font-medium text-right shrink-0">{g.valor}</span>
      </div>
    ))}
  </div>
);
