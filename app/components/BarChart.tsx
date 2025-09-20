import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

interface ProductBarChartProps {
  labels: string[];
  values: number[];
  yAxisSuffix?: string;
}

const ProductBarChart = ({
  labels,
  values,
  yAxisSuffix = "",
}: ProductBarChartProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const [ready, setReady] = useState(false);

  // calcula largura do gráfico: maior entre tela e número de barras * largura mínima por barra
  const minBarWidth = 80; // largura mínima por barra
  const chartWidth = Math.max(screenWidth - 60, labels.length * minBarWidth);

  const data = { labels, datasets: [{ data: values }] };

  return (
    <View onLayout={() => setReady(true)}>
      {!ready && (
        <View
          style={{
            height: 250,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="rgba(97, 148, 79, 1)" />
          <Text style={{ marginTop: 10 }}>Carregando gráfico...</Text>
        </View>
      )}

      {ready && (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <BarChart
            data={data}
            width={chartWidth}
            height={250}
            fromZero
            yAxisLabel="R$"
            yAxisSuffix={yAxisSuffix}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#f5f5f5",
              decimalPlaces: 0,
              color: () => `rgba(97, 148, 79, 1)`,
              labelColor: () => "#000000",
            }}
            style={{ borderRadius: 16 }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default ProductBarChart;
