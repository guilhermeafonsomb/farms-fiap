import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

type UpdateStockProps = {
  onUpdate: (name: string, delta: number) => void;
};

const UpdateStock: React.FC<UpdateStockProps> = ({ onUpdate }) => {
  const [name, setName] = useState("");
  const [delta, setDelta] = useState("");

  const handleUpdate = () => {
    if (!name || !delta) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    onUpdate(name, Number(delta));
    setName("");
    setDelta("");
  };

  return (
    <View className="mb-10 max-w-md">
      <Text className="text-lg font-semibold mb-3">Atualizar Estoque</Text>
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder="Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="rounded-lg p-3 mb-3 bg-primary-100"
        placeholder="+10 (entrada) ou -5 (saída)"
        keyboardType="numeric"
        value={delta}
        onChangeText={setDelta}
      />
      <TouchableOpacity
        className="bg-[#61944F] py-3 rounded-lg"
        onPress={handleUpdate}
      >
        <Text className="text-center text-white font-semibold">
          Atualizar Estoque
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateStock;
