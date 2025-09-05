import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import Button from "../components/Button";
import ContainerView from "../components/ContainerView";
import { Input } from "../components/Input";

const HomeScreen = () => {
  const [inputValue, onChangeInputValue] = useState<string>("");

  const onChangeInput = (text: string) => {
    onChangeInputValue(text);
  };

  const handlePress = () => {
    console.log(inputValue, "inputValue");
  };

  const users = [
    { id: "1", name: "Ana Silva", email: "ana.silva@email.com" },
    { id: "2", name: "Carlos Souza", email: "carlos.souza@email.com" },
    { id: "3", name: "Marina Costa", email: "marina.costa@email.com" },
    { id: "4", name: "Ricardo Santos", email: "ricardo.santos@email.com" },
    { id: "5", name: "Julia Oliveira", email: "julia.oliveira@email.com" },
    { id: "6", name: "Fernando Lima", email: "fernando.lima@email.com" },
    { id: "7", name: "Patricia Rocha", email: "patricia.rocha@email.com" },
    { id: "8", name: "Roberto Alves", email: "roberto.alves@email.com" },
  ];

  return (
    <ContainerView>
      <Input placeholder="placeholder" />

      <Button>Butaaaton</Button>

      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </ContainerView>
  );
};

export default HomeScreen;
