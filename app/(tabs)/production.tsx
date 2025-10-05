import { Apple, Carrot, Leaf } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ContainerView from "../components/ContainerView";
import { useProducts } from "../hooks/useProducts";

export default function ProductionScreen() {
  const [tab, setTab] = useState<"aguardando" | "produção" | "colhido">(
    "produção"
  );

  const { data: products } = useProducts();

  const filteredProducts = products?.filter(
    (product) => product.status === tab
  );

  const iconMap = {
    Verdura: <Leaf size={20} color="#121C0D" />,
    Legume: <Carrot size={20} color="#121C0D" />,
    Fruta: <Apple size={20} color="#121C0D" />,
    Outro: <Leaf size={20} color="#121C0D" />,
  };

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
        <Text className="text-black text-2xl font-bold mb-6">
          Produção de Alimentos
        </Text>

        <View className="flex-row mb-3 border-b border-gray-200 h-14">
          <TouchableOpacity
            className={`mr-6 pb-2 border-b-[3px] ${
              tab === "produção" ? " border-black" : "border-gray-200"
            }`}
            onPress={() => setTab("produção")}
          >
            <Text
              className={`font-bold my-auto ${
                tab === "produção" ? "text-black" : "text-primary-500"
              }`}
            >
              Em Produção
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`mr-6 pb-2 border-b-[3px] ${
              tab === "aguardando" ? " border-black" : "border-gray-200"
            }`}
            onPress={() => setTab("aguardando")}
          >
            <Text
              className={`font-bold my-auto ${
                tab === "aguardando" ? "text-black" : "text-primary-500"
              }`}
            >
              Aguardando
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`pb-2 border-b-[3px] ${
              tab === "colhido" ? " border-black" : "border-gray-200"
            }`}
            onPress={() => setTab("colhido")}
          >
            <Text
              className={`font-bold my-auto ${
                tab === "colhido" ? "text-black" : "text-primary-500"
              }`}
            >
              Já Colhido
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center rounded-lg py-3 px-4 mb-3">
              <View className="bg-primary-100 p-3 rounded-lg mr-3">
                {iconMap?.[item.type as keyof typeof iconMap] ||
                  iconMap["Outro"]}
              </View>
              <View>
                <Text className="font-medium text-base text-black">
                  {item.name}
                </Text>
                <Text className="text-primary-500 text-sm">
                  {item.quantity} itens
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ContainerView>
  );
}
