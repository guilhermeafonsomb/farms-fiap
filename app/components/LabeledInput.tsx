import { useState } from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: "money" | "unit";
  placeholder?: string;
};

function LabeledInput({
  label,
  value,
  onChangeText,
  type = "money",
  placeholder,
}: Props) {
  const [displayValue, setDisplayValue] = useState(value);

  function handleChange(text: string) {
    let numeric = text.replace(/\D/g, ""); // pega só números

    if (type === "money") {
      let number = parseFloat(numeric) / 100; // exemplo: "5000" => 50.00
      let formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(number);
      setDisplayValue(formatted);
      onChangeText(number.toString()); // valor "cru" sem formatação
    } else if (type === "unit") {
      let number = parseInt(numeric) || 0;
      let formatted = `${number} unidades`;
      setDisplayValue(formatted);
      onChangeText(number.toString()); // valor "cru"
    }
  }

  return (
    <View>
      <Text className="text-base font-medium text-black mb-2">{label}</Text>
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder={placeholder}
        value={displayValue}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
    </View>
  );
}

export default LabeledInput;
