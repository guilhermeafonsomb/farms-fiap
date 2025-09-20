import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export type Product = {
  name: string;
  quantity: number;
  type: string;
};

type NewProductProps = {
  onAdd: (product: Product) => void;
};

const NewProduct: React.FC<NewProductProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");

  const handleAdd = () => {
    if (!name || !quantity || !type) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    onAdd({ name, quantity: Number(quantity), type });
    setName("");
    setQuantity("");
    setType("");
  };

  return (
    <View className="mb-10 max-w-md">
      <Text className="text-lg font-semibold mb-3">Novo Produto</Text>
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
      />
      <TouchableOpacity
        className="bg-[#61944F] py-3 rounded-lg"
        onPress={handleAdd}
      >
        <Text className="text-center text-white font-semibold">
          Adicionar Produto
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewProduct;
