import { TextInput, TextInputProps } from "react-native";

export const Input = ({ value, placeholder, ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      className="flex-1 w-full text-primary-500 rounded-lg max-h-14 bg-primary-100"
      placeholder={placeholder?.toUpperCase()}
      placeholderTextColor="#A8B5DB"
      value={value}
    />
  );
};

export default Input;
