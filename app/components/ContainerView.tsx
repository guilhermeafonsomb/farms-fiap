import clsx from "clsx";
import { ScrollView } from "react-native";

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
    <ScrollView
      className={clsx("bg-white flex-1 pt-12 px-5 mb-24", className)}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default ContainerView;
