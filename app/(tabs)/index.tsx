import clsx from "clsx";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ContainerView from "../components/ContainerView";

const HomeScreen = () => {
  const [selectFilterOption, setSelectFilterOption] = useState();

  const handleFilterOption = (text: string) => {};

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

      <View className="rounded-lg bg-primary-100 flex flex-row h-14 items-center justify-evenly">
        <TouchableOpacity className="text-center py-2 px-10 rounded-lg">
          <Text className={clsx("text-primary-500")}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity className={clsx("text-center py-2 px-10 rounded-lg")}>
          <Text className={clsx("text-primary-500")}>Mensal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="text-center py-2 px-10 rounded-lg">
          <Text className={clsx("text-primary-500")}>Anual</Text>
        </TouchableOpacity>
      </View>
    </ContainerView>
  );
};

export default HomeScreen;
