import { Tabs } from "expo-router";
import { Text, View } from "react-native";

interface TabIconProps {
  focused: boolean;
  title: string;
}

const TabIcon = ({ focused, title }: TabIconProps) => {
  if (focused) {
    return (
      <View className="flex w-full min-w-[80px] justify-center items-center">
        <Text className="text-primary-100 text-base font-bold pl-2 pt-3">
          {title}
        </Text>
      </View>
    );
  } else {
    return (
      <View className="flex w-full min-w-[80px] justify-center items-center">
        <Text className="text-primary-100 opacity-80 text-base  pl-2 pt-3">
          {title}
        </Text>
      </View>
    );
  }
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#61944F",
          marginBottom: 40,
          height: 52,
          position: "absolute",
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Dashboard" />
          ),
        }}
      />

      <Tabs.Screen
        name="sales"
        options={{
          title: "Vendas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Vendas" />
          ),
        }}
      />
      <Tabs.Screen
        name="production"
        options={{
          title: "Produção",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Produção" />
          ),
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Metas",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Metas" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
