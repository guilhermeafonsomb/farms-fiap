import clsx from "clsx";
import React from "react";

import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonOpacityProps extends TouchableOpacityProps {
  icon?: any;
  children: React.ReactNode;
}

const Button = ({
  children,
  icon,
  className,
  ...props
}: ButtonOpacityProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        "w-full bg-accent rounded-lg bg-primary-500 py-3.5 flex flex-row items-center justify-center z-50",
        className
      )}
      {...props}
    >
      <Text className="text-white font-bold text-base">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
