import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import ContainerView from "../components/ContainerView";
import LabeledInput from "../components/LabeledInput";
import { Table } from "../components/Table";

function Goals() {
  const [dailySalesGoal, setDailySalesGoal] = useState("");
  const [monthlySalesGoal, setMonthlySalesGoal] = useState("");
  const [prodAGoal, setProdAGoal] = useState("");
  const [prodBGoal, setProdBGoal] = useState("");

  const progressData = [
    { label: "Vendas Diárias", goal: "Meta: R$ 5.000", progress: 0.75 },
    { label: "Vendas Mensais", goal: "Meta: R$ 150.000", progress: 0.5 },
    { label: "Produção (Tipo A)", goal: "Meta: 1000 unidades", progress: 0.9 },
    { label: "Produção (Tipo B)", goal: "Meta: 500 unidades", progress: 0.6 },
  ];

  const historyData = [
    {
      id: "1",
      date: "01/07/2024",
      goal: "Vendas Diárias",
      result: "R$ 5.200",
      status: "Atingida",
    },
    {
      id: "2",
      date: "01/07/2024",
      goal: "Produção (Tipo A)",
      result: "1050 unidades",
      status: "Atingida",
    },
    {
      id: "3",
      date: "01/06/2024",
      goal: "Vendas Mensais",
      result: "R$ 160.000",
      status: "Atingida",
    },
  ];

  const tableHead = ["Data", "Meta", "Resultado", "Status"];
  const tableDataFormatted = historyData?.map((item) => [
    item.date,
    item.goal,
    item.result,
    item.status,
  ]);

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
        <Text className="text-2xl font-bold mb-3">
          Metas de Vendas e Produção
        </Text>
        <Text className="text-primary-500 mb-8">
          Defina e acompanhe suas metas para otimizar a produção e impulsionar
          as vendas.
        </Text>

        <Text className="text-lg font-bold mb-5">Definir metas</Text>

        <View className="grid grid-cols-2 gap-4 mb-6 max-w-lg">
          <LabeledInput
            label="Meta de Vendas Diárias"
            type="money"
            value={dailySalesGoal}
            onChangeText={setDailySalesGoal}
          />
          <LabeledInput
            label="Meta de Vendas Mensais"
            type="money"
            value={monthlySalesGoal}
            onChangeText={setMonthlySalesGoal}
          />
          <LabeledInput
            label="Meta de Produção (Tipo A)"
            type="unit"
            value={prodAGoal}
            onChangeText={setProdAGoal}
          />
          <LabeledInput
            label="Meta de Produção (Tipo B)"
            type="unit"
            value={prodBGoal}
            onChangeText={setProdBGoal}
          />
        </View>

        <TouchableOpacity className="bg-primary-500 p-3 rounded-lg items-center ml-auto mb-3">
          <Text className="text-white font-bold">Salvar Metas</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold mb-5">Progresso das Metas</Text>
        {progressData.map((item, index) => (
          <View key={index} className="mb-6">
            <Text className="text-base text-black font-medium mb-3">
              {item.label} ({Math.round(item.progress * 100)}%)
            </Text>
            <Progress.Bar
              progress={item.progress}
              width={null}
              height={8}
              color="#4dde21"
              unfilledColor="#e5e7eb"
              borderWidth={0}
            />
            <Text className="text-sm text-primary-500 mt-3">{item.goal}</Text>
          </View>
        ))}

        <Text className="text-lg font-bold mb-5 mt-2">
          Histórico de Metas Atingidas
        </Text>
        {tableDataFormatted && tableDataFormatted.length > 0 && (
          <Table tableHead={tableHead} tableRows={tableDataFormatted} />
        )}
      </View>
    </ContainerView>
  );
}

export default Goals;
