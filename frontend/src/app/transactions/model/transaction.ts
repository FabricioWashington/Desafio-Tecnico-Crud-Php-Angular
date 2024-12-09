export interface Transaction {
  id: number;
  descricao: string;
  valor: number;
  tipo: 'Despesa' | 'Receita';
  idCategoria: number;
  categoria?: { id: number; nome: string };
  data: string;
}
