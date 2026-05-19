export type PatrimonioTipo =
  | ""
  | "Imóvel"
  | "Veículo"
  | "Investimento"
  | "Equipamento"
  | "Outros";

export type NavItem = "Home" | "Despesas";

export interface FormState {
  tipo: PatrimonioTipo;
  nome: string;
  valor: string;
}
