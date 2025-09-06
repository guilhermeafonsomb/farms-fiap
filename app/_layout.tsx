import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "react-native-reanimated";
import { ensureFirebase } from "../lib/firebase";
import { TopBar } from "./components/TopBar";
import "./global.css";

ensureFirebase();

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <TopBar />
      <Stack>
        <StatusBar hidden={true} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
};

export default RootLayout;
