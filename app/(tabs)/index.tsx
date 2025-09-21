import { Text, View } from "react-native";
import ContainerView from "../components/ContainerView";
import HomeFilter from "../components/HomeFilter";
import Table from "../components/Table";
import { useProductsByPeriod } from "../hooks/useProductsByPeriod";
import { useHomeFilterStore } from "../store/homeFilter";
import { formatCurrency } from "../utils/currencyFormatter";

const HomeScreen = () => {
  const { selectFilterOption } = useHomeFilterStore();

  const periodoMap: Record<string, "Semanal" | "Mensal" | "Anual"> = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  const periodo = periodoMap[selectFilterOption] ?? "Mensal";

  const { data: produtos, isLoading, isError } = useProductsByPeriod(periodo);

  const tableDataFormatted = produtos?.map((item) => [
    item.nome,
    formatCurrency(item.lucro),
    item.vendas.toString(),
    item.periodo,
  ]);

  const tableHead = ["Produtos", "Lucro", "Vendas", "Período"];

  if (isLoading) {
    return (
      <ContainerView>
        <Text>Carregando...</Text>
      </ContainerView>
    );
  }

  if (isError) {
    return (
      <ContainerView>
        <Text>Ocorreu um erro ao buscar os dados.</Text>
      </ContainerView>
    );
  }

  return (
    <ContainerView>
      <View className="flex flex-col gap-6">
        <Text className="text-2xl text-black font-bold">
          Dashboard de Produtos
        </Text>
        <Text className="text-lg text-black font-bold">
          Produtos por maior lucro
        </Text>
      </View>

      <HomeFilter />
      {tableDataFormatted && tableDataFormatted.length > 0 && (
        <Table tableHead={tableHead} tableRows={tableDataFormatted} />
      )}
    </ContainerView>
  );
};

export default HomeScreen;
