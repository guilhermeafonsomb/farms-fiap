import { Models, Query } from "appwrite";
import { id, tablesDB } from "../../lib/appwrite";

const DATABASE_ID = "68d021ad002fe84e49fb";
const COLLECTION_ID_PRODUTOS = "produtos";
const COLLECTION_ID_ESTOQUE = "estoque";

export type Produto = Models.Row & {
  rowId: string;
  nome: string;
  quantidade: number;
  categoria: string;
  status: "aguardando" | "produção" | "colhido";
};

export type ProdutoSale = Models.Row & {
  rowId: string;
  nome: string;
  quantidade: number;
  categoria: string;
  lucro: number;
  vendas: number;
};

export type ProdutoByPeriod = Models.Row & {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
};

export async function fetchProducts() {
  try {
    const response = await tablesDB.listRows<Produto>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_ESTOQUE,
    });

    return response.rows.map((doc) => ({
      id: doc.$id,
      name: doc.nome,
      quantity: doc.quantidade,
      type: doc.categoria,
      status: doc.status,
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos do estoque:", error);
    throw error;
  }
}

export const fetchProductsByPeriod = async (
  period: "Semanal" | "Mensal" | "Anual"
): Promise<ProdutoByPeriod[]> => {
  const response = await tablesDB.listRows<ProdutoByPeriod>({
    databaseId: DATABASE_ID,
    tableId: COLLECTION_ID_PRODUTOS,
    queries: [Query.equal("periodo", period)],
  });
  return response.rows;
};

export const addProduto = async ({
  name,
  quantity,
  type,
}: {
  name: string;
  quantity: number;
  type: string;
}) => {
  try {
    // Busca se já existe um produto com esse nome no estoque
    const response = await tablesDB.listRows<Produto>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_ESTOQUE,
      queries: [Query.equal("nome", name)],
    });

    const existingProduct = response.rows[0];

    if (existingProduct) {
      const updateResponse = await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID_ESTOQUE,
        rowId: existingProduct.$id,
        data: {
          quantidade: existingProduct.quantidade + quantity,
          categoria: type,
          status: "aguardando",
        },
      });

      return updateResponse;
    } else {
      // Produto não existe → cria novo com status inicial
      const createResponse = await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: COLLECTION_ID_ESTOQUE,
        rowId: id.unique(),
        data: {
          nome: name,
          quantidade: quantity,
          categoria: type,
          status: "produção",
        },
      });

      return createResponse;
    }
  } catch (error) {
    console.error("Erro ao criar/atualizar produto:", error);
    throw error;
  }
};

export const updateProductQuantity = async ({
  productName,
  newQuantity,
  isSale,
}: {
  productName: string;
  newQuantity: number;
  isSale: boolean;
}) => {
  try {
    // Busca o product pelo nome
    const response = await tablesDB.listRows<Produto>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_ESTOQUE,
      queries: [Query.equal("nome", productName)],
    });

    const product = response.rows[0];

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    // Atualiza a quantidade usando o $id do produto encontrado
    const updateResponse = await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_ESTOQUE,
      rowId: product.$id,
      data: {
        quantidade: newQuantity,
        status: isSale ? "colhido" : "aguardando",
      },
    });

    return updateResponse;
  } catch (error) {
    console.error("Erro ao atualizar a quantidade do produto:", error);
    throw error;
  }
};

export async function addSoldProduct({
  productName,
  quantity,
  price,
  periodo,
}: {
  productName: string;
  quantity: number;
  price: number;
  periodo: "Semanal" | "Mensal" | "Anual";
}) {
  const { rows } = await tablesDB.listRows<ProdutoSale>({
    databaseId: DATABASE_ID,
    tableId: COLLECTION_ID_PRODUTOS,
    queries: [
      Query.equal("nome", productName),
      Query.equal("periodo", periodo),
    ],
  });

  const lucro = quantity * price;

  if (rows.length === 0) {
    // Produto ainda não tem registro na tabela de produtos por período
    await tablesDB.createRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_PRODUTOS,
      rowId: id.unique(),
      data: {
        nome: productName,
        vendas: quantity,
        lucro,
        periodo,
      },
    });
  } else {
    const product = rows[0];
    const novasVendas = (product.vendas ?? 0) + quantity;
    const novoLucro = (product.lucro ?? 0) + lucro;

    await tablesDB.updateRow({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID_PRODUTOS,
      rowId: product.$id,
      data: {
        vendas: novasVendas,
        lucro: novoLucro,
      },
    });
  }
}
