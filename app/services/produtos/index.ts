import { Models, Query } from "appwrite";
import { tablesDB } from "../../lib/appwrite";

export type Produto = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
};

export const fetchProductsByPeriod = async (
  period: "Semanal" | "Mensal" | "Anual"
): Promise<Produto[]> => {
  const response = await tablesDB.listRows<Produto>({
    databaseId: "68d021ad002fe84e49fb",
    tableId: "produtos",
    queries: [Query.equal("periodo", period)],
  });
  return response.rows;
};
