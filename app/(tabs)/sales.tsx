import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import ContainerView from "../components/ContainerView";
import NewProduct, { Product } from "../components/NewProduct";
import RegisterSale, { Sale } from "../components/RegisterSale";
import UpdateStock from "../components/UpdateStock";

function Sales() {
  const [products, setProducts] = useState<Product[]>([
    { name: "Maçã", quantity: 100, type: "Fruta" },
    { name: "Tomate", quantity: 50, type: "Legume" },
  ]);

  const [sales, setSales] = useState<Sale[]>([]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    Alert.alert("Sucesso", "Produto adicionado!");
  };

  const updateStock = (name: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.name === name ? { ...p, quantity: p.quantity + delta } : p
      )
    );
    Alert.alert("Sucesso", "Estoque atualizado!");
  };

  const registerSale = (sale: Sale) => {
    setSales((prev) => [...prev, sale]);
    updateStock(sale.product, -sale.quantity);
    Alert.alert("Sucesso", "Venda registrada!");
  };

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
        <Text className="text-2xl font-bold mb-6">Estoque e Vendas</Text>

        <NewProduct onAdd={addProduct} />
        <UpdateStock onUpdate={updateStock} />
        <RegisterSale onRegister={registerSale} products={products} />

        {/* Lista de Produtos */}
        <View className="max-w-md w-full">
          <Text className="text-lg font-semibold mb-3">
            Produtos em Estoque
          </Text>
          {products.map((p, i) => (
            <View
              key={i}
              className="shadow-md shadow-primary-100 p-3 rounded-lg mb-2 bg-gray-50"
            >
              <Text className="font-bold">{p.name}</Text>
              <Text>Quantidade: {p.quantity}</Text>
              <Text>Tipo: {p.type}</Text>
            </View>
          ))}
        </View>
      </View>
    </ContainerView>
  );
}

export default Sales;
