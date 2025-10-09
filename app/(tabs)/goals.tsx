import React from "react";
import { Text, View } from "react-native";
import * as Progress from "react-native-progress";
import ContainerView from "../components/ContainerView";
import { Table } from "../components/Table";
import { useProductsAllPeriod } from "../hooks/useProductsAllPeriod";

function Goals() {
  const { data: produtos } = useProductsAllPeriod();

  const progressData =
    produtos?.flatMap((produto) => {
      const nome = produto?.nome ?? "Produto";
      const periodo = produto?.periodo ?? "Período indefinido";
      const meta = produto?.meta ?? 0;
      const lucro = produto?.lucro ?? 0;

      const progresso = meta > 0 ? lucro / meta : 0;

      return {
        label: `${nome} - ${periodo}`,
        goal: `Meta: ${
          typeof meta === "number" ? `R$ ${meta.toFixed(2)}` : meta
        }`,
        progress: Math.min(progresso, 1),
      };
    }) ?? [];

  const historyData =
    produtos?.map((produto, index) => {
      const nome = produto?.nome ?? "Produto";
      const periodo = produto?.periodo ?? "Período indefinido";
      const meta = produto?.meta ?? 0;
      const lucro = produto?.lucro ?? 0;

      const atingiuMeta = meta > 0 && lucro >= meta;

      return {
        id: String(index),
        produto: nome,
        date: periodo,
        goal: meta,
        status: atingiuMeta ? "Atingida" : "Não atingida",
      };
    }) ?? [];

  const tableHead = ["Data", "Meta", "Produto", "Status"];
  const tableDataFormatted = historyData?.map((item) => [
    item.date,
    item.goal,
    item.produto,
    item.status,
  ]);

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
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
