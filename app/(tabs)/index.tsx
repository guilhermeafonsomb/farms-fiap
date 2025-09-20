import { Text, View } from "react-native";
import ProductBarChart from "../components/BarChart";
import ContainerView from "../components/ContainerView";
import HomeFilter, { FilterOptions } from "../components/HomeFilter";
import Table from "../components/Table";
import { useHomeFilterStore } from "../store/homeFilter";
import { formatCurrency } from "../utils/currencyFormatter";

const HomeScreen = () => {
  const { selectFilterOption } = useHomeFilterStore();

  const tableHead = ["Produtos", "Lucro", "Vendas", "Período"];

  const tableData = [
    {
      product: "Produto A",
      profit: 15000,
      sales: "100",
    },
    {
      product: "Produto B",
      profit: 12000,
      sales: "200",
    },
    {
      product: "Produto C",
      profit: 8000,
      sales: "300",
    },
    {
      product: "Produto D",
      profit: 10000,
      sales: "1500",
    },
  ];

  const tableDataFormatted = tableData.map((item) => [
    item.product,
    formatCurrency(item.profit),
    item.sales,
    FilterOptions[selectFilterOption],
  ]);

  return (
    <ContainerView>
      <View className="flex flex-col gap-6">
        <Text className="text-2xl text-black font-bold">
          Dashboard de Produtos
        </Text>

        <View style={{ marginTop: 20 }}>
          <ProductBarChart
            labels={tableData.map((item) => item.product)}
            values={tableData.map((item) => item.profit)}
          />
        </View>

        <Text className="text-lg text-black font-bold">
          Produtos por maior lucro
        </Text>
      </View>

      <HomeFilter />
      <Table tableHead={tableHead} tableRows={tableDataFormatted} />
    </ContainerView>
  );
};

export default HomeScreen;
