import { images } from "@/constants/images";
import { Image, View } from "react-native";

export const TopBar = () => {
  return (
    <View className="bg-primary-100 pt-12 px-6 pb-2 border-b border-black/20">
      <Image className="mx-auto" source={images.logo} />
    </View>
  );
};
