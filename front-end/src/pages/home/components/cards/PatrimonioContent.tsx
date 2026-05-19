import type { PatrimonioItem } from "../shared/types";

interface PatrimonioContentProps {
  patrimonio: PatrimonioItem[];
}

export const PatrimonioContent = ({ patrimonio }: PatrimonioContentProps) => (
  <>
    <div className="grid grid-cols-3 text-xs font-semibold text-green-700 border border-green-200 rounded-lg px-3 py-1.5 bg-green-50">
      <span>Valor</span>
      <span className="text-center">Tipo</span>
      <span className="text-right">Nome</span>
    </div>
    <div className="flex-1">
      {patrimonio.map((item, i) => (
        <div key={i} className="grid grid-cols-3 items-center text-sm text-gray-700 py-2.5 border-b border-gray-100 last:border-0">
          <span className="text-gray-800 font-medium text-xs">{item.valor}</span>
          <span className="text-center font-bold">{item.tipo}</span>
          <span className="text-right font-bold">{item.nome}</span>
        </div>
      ))}
    </div>
  </>
);
