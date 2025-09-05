import clsx from "clsx";
import { View } from "react-native";

interface ContainerViewProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerView = ({
  children,
  className,
  ...props
}: ContainerViewProps) => {
  return (
    <View className={clsx("bg-white flex-1 pt-12 px-5", className)} {...props}>
      {children}
    </View>
  );
};

export default ContainerView;
