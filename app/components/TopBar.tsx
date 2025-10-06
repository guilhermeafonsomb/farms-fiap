import { images } from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export const TopBar = () => {
  const { user, logout, loading } = useAuth();

  return (
    <View className="bg-white pt-12 px-6 pb-2 border-b border-black/20 flex-row items-center justify-between">
      <Image
        className="mx-auto flex-1"
        source={images.logo}
        resizeMode="contain"
      />

      {user && (
        <TouchableOpacity
          onPress={logout}
          className="ml-2 px-4 py-2 bg-red-500 rounded"
          disabled={loading}
        >
          <Text className="text-white font-bold">
            {loading ? "..." : "Logout"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopBar;
