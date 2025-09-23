import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Product } from "./NewProduct";

export type Sale = {
  product: string;
  quantity: number;
  price: number;
  date: string;
};

type RegisterSaleProps = {
  onRegister: (sale: Sale) => void;
  products: Product[];
};

const RegisterSale: React.FC<RegisterSaleProps> = ({
  onRegister,
  products,
}) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const handleRegister = () => {
    if (!product || !quantity || !price || !date) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    onRegister({
      product,
      quantity: Number(quantity),
      price: Number(price),
      date,
    });
    setProduct("");
    setQuantity("");
    setPrice("");
    setDate("");
  };

  return (
    <View className="mb-10 max-w-md">
      <Text className="text-lg font-semibold mb-3">Registrar Venda</Text>
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        placeholder="Produto"
        value={product}
        onChangeText={setProduct}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        placeholder="Quantidade Vendida"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        placeholder="Preço"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity
        className="bg-[#61944F] py-3 rounded-lg"
        onPress={handleRegister}
      >
        <Text className="text-center text-white font-semibold">
          Registrar Venda
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterSale;
