export interface GastoFixo {
  nome: string;
  categoria: string;
  valor: string;
  parcelas: string;
}

export interface GastoVariavel {
  nome: string;
  categoria: string;
  valor: string;
}

export interface PatrimonioItem {
  valor: string;
  tipo: string;
  nome: string;
}
