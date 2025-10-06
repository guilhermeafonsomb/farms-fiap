import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, StatusBar, View } from "react-native";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { TopBar } from "./components/TopBar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./global.css";

const queryClient = new QueryClient();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar hidden={true} />
        <AppContent />
        {/* 🔹 Toast deve ficar FORA do Stack para aparecer em todas as telas */}
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4A7A3C" />
      </View>
    );
  }

  return (
    <>
      {user && <TopBar />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {!user && <Redirect href="/(auth)/login" />}
      {user && <Redirect href="/(tabs)" />}
    </>
  );
};

export default RootLayout;
