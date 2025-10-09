import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Product } from "./NewProduct";

export type Sale = {
  product: string;
  quantity: number;
  price: number;
  periodo: "Semanal" | "Mensal" | "Anual";
  meta: number;
};

type RegisterSaleProps = {
  onRegister: (sale: Sale) => void;
  products?: Product[];
};

const RegisterSale: React.FC<RegisterSaleProps> = ({
  onRegister,
  products,
}) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [periodo, setPeriodo] = useState<"Semanal" | "Mensal" | "Anual">(
    "Semanal"
  );
  const [meta, setMeta] = useState(0);
  const handleRegister = () => {
    if (!product || !quantity || !price || !periodo || !meta || meta === 0) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    onRegister({
      product,
      quantity: Number(quantity),
      price: Number(price),
      periodo,
      meta,
    });
    setProduct("");
    setQuantity("");
    setPrice("");
    setPeriodo("Semanal");
    setMeta(0);
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
      <Picker
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        selectedValue={periodo}
        onValueChange={(value: string) =>
          setPeriodo(value as "Semanal" | "Mensal" | "Anual")
        }
      >
        <Picker.Item label="Semanal" value="Semanal" />
        <Picker.Item label="Mensal" value="Mensal" />
        <Picker.Item label="Anual" value="Anual" />
      </Picker>
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100 green-50"
        placeholder="Meta"
        keyboardType="numeric"
        onChangeText={(text) => setMeta(Number(text))}
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
