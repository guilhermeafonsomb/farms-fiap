import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Alert, Text, View } from "react-native";
import ContainerView from "../components/ContainerView";
import NewProduct, { Product } from "../components/NewProduct";
import RegisterSale, { Sale } from "../components/RegisterSale";
import UpdateStock from "../components/UpdateStock";
import { useAddProduct } from "../hooks/useAddProducts";
import { useProducts } from "../hooks/useProducts";
import { addSoldProduct, updateProductQuantity } from "../services/produtos";

function Sales() {
  const queryClient = useQueryClient();
  const { data: products } = useProducts();
  const { mutate: addProduct } = useAddProduct();

  const handleAddProduct = async (product: Product) => {
    try {
      addProduct({
        name: product.name,
        quantity: product.quantity,
        type: product.type,
      });

      Alert.alert("Sucesso", "Produto adicionado!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o produto.");
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const updateStock = async (name: string, delta: number, showAlert = true) => {
    try {
      const product = products?.find((p) => p.name === name);

      if (!product) {
        Alert.alert("Erro", "Produto não encontrado.");
        return;
      }

      const newQuantity = product.quantity + delta;

      await updateProductQuantity({
        productName: name,
        newQuantity: newQuantity,
      });

      await queryClient.invalidateQueries({ queryKey: ["produtos"] });

      if (showAlert) {
        Alert.alert("Sucesso", "Estoque atualizado!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o estoque.");
      console.error("Erro ao atualizar estoque:", error);
    }
  };

  const registerSale = async (sale: Sale) => {
    try {
      await addSoldProduct({
        productName: sale.product,
        quantity: sale.quantity,
        price: sale.price,
        periodo: sale.periodo,
      });
      await updateStock(sale.product, -sale.quantity, false);
      Alert.alert("Sucesso", "Venda registrada!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível registrar a venda.");
      console.error("Erro ao registrar venda:", error);
    }
  };

  return (
    <ContainerView>
      <View className="max-w-5xl mx-auto w-full">
        <Text className="text-2xl font-bold mb-6">Estoque e Vendas</Text>

        <NewProduct onAdd={handleAddProduct} />
        <UpdateStock onUpdate={updateStock} />
        <RegisterSale onRegister={registerSale} products={products} />

        {/* Lista de Produtos */}
        <View className="max-w-md w-full">
          <Text className="text-lg font-semibold mb-3">
            Produtos em Estoque
          </Text>
          {products?.map((p, i) => (
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
