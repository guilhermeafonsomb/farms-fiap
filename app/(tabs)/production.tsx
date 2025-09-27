import { Apple, Carrot, Leaf } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ContainerView from "../components/ContainerView";

type Food = {
  id: string;
  name: string;
  quantity: number;
  icon: React.ReactNode;
  status: "aguardando" | "producao" | "colhido";
};

export default function ProductionScreen() {
  const [tab, setTab] = useState<"aguardando" | "producao" | "colhido">(
    "aguardando"
  );

  const foods: Food[] = [
    {
      id: "1",
      name: "Alface",
      quantity: 5,
      icon: <Leaf size={20} color="#121C0D" />,
      status: "aguardando",
    },
    {
      id: "2",
      name: "Maçã",
      quantity: 10,
      icon: <Apple size={20} color="#121C0D" />,
      status: "colhido",
    },
    {
      id: "3",
      name: "Cenoura",
      quantity: 12,
      icon: <Carrot size={20} color="#121C0D" />,
      status: "producao",
    },
    {
      id: "4",
      name: "Pepino",
      quantity: 10,
      icon: <Carrot size={20} color="#121C0D" />,
      status: "aguardando",
    },
  ];

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
        <Text className="text-black text-2xl font-bold mb-6">
          Produção de Alimentos
        </Text>

        <View className="flex-row mb-3 border-b border-gray-200 h-14">
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
            className={`mr-6 pb-2 border-b-[3px] ${
              tab === "producao" ? " border-black" : "border-gray-200"
            }`}
            onPress={() => setTab("producao")}
          >
            <Text
              className={`font-bold my-auto ${
                tab === "producao" ? "text-black" : "text-primary-500"
              }`}
            >
              Em Produção
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
          data={foods.filter((food) => food.status === tab)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center rounded-lg py-3 px-4 mb-3">
              <View className="bg-primary-100 p-3 rounded-lg mr-3">
                {item.icon}
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
