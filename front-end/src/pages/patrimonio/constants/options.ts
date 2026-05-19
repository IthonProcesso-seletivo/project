import type { PatrimonioTipo, NavItem } from "../types/patrimonio";

export const TIPOS: PatrimonioTipo[] = [
  "Imóvel",
  "Veículo",
  "Investimento",
  "Equipamento",
  "Outros",
];

export const NAV_ROUTES: Record<NavItem, string> = {
  Home: "/",
  Despesas: "/despesas",
};
