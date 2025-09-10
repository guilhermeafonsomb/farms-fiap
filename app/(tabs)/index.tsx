import { Text, View } from "react-native";
import ContainerView from "../components/ContainerView";
import HomeFilter from "../components/HomeFilter";

enum FilterOptions {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

const HomeScreen = () => {
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
    </ContainerView>
  );
};

export default HomeScreen;
