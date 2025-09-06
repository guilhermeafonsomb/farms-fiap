import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { api } from "../../lib/api";
import { signInWithEmail } from "../../lib/auth";
import { TEST_USER } from "../../lib/test-user";
import ContainerView from "../components/ContainerView";
import { Input } from "../components/Input";

const HomeScreen = () => {
  const [inputValue, onChangeInputValue] = useState<string>("");
  const [status, setStatus] = useState<string>("iniciando...");
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

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

  useEffect(() => {
    (async () => {
      try {
        setStatus("autenticando...");
        await signInWithEmail(TEST_USER.email, TEST_USER.password);

        setStatus("checando API...");
        const h = await api.health();
        if (!h.ok) throw new Error("api_offline");

        setStatus("semeando produtos...");
        setLoadingProducts(true);

        // Verifica se já existem produtos para evitar duplicar ao recarregar
        const existing = await api.listProducts();
        if (!Array.isArray(existing) || existing.length < 3) {
          // cria 3 produtos (idempotência simples por nome)
          const want = [
            {
              name: "Tomate",
              category: "Hortaliças",
              cost: 5.2,
              price: 12.5,
              stock: 100,
            },
            {
              name: "Cenoura",
              category: "Hortaliças",
              cost: 3.0,
              price: 8.0,
              stock: 60,
            },
            {
              name: "Alface",
              category: "Hortaliças",
              cost: 2.0,
              price: 6.0,
              stock: 50,
            },
          ];

          // cria apenas os que não existem por nome
          const existingNames = new Set(
            existing.map((p: any) => (p?.name || "").toLowerCase())
          );
          for (const p of want) {
            if (!existingNames.has(p.name.toLowerCase())) {
              await api.createProduct(p);
            }
          }
        }

        // carrega lista final
        const list = await api.listProducts();
        setProducts(list);
        setStatus("API OK");
      } catch (e: any) {
        setStatus(`erro: ${e?.message || String(e)}`);
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, []);

  return (
    <ContainerView>
      <Text
        style={{
          marginBottom: 8,
          color: status.startsWith("erro") ? "red" : "#333",
        }}
      >
        {status}
      </Text>
      <Input placeholder="placeholder" />

      {loadingProducts ? (
        <Text>Carregando produtos...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{ padding: 8, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>ID: {item.id}</Text>
              <Text>Preço: {item.price}</Text>
              <Text>Estoque: {item.stock}</Text>
              <Text>Categoria: {item.category}</Text>
              <Text>Custo: {item.cost}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhum produto cadastrado.</Text>}
        />
      )}

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
