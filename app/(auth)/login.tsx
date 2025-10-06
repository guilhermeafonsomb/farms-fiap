import { Leaf, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../context/AuthContext";

export const LoginScreenOptions = {
  headerShown: false,
};

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Preencha e-mail e senha",
      });
      return;
    }

    setLoggingIn(true);
    try {
      await login(email, password);
      Toast.show({
        type: "success",
        text1: "Sucesso!",
        text2: "Login realizado com sucesso",
      });
    } catch (err: any) {
      const errorMessage =
        err.code === 401
          ? "E-mail ou senha incorretos"
          : err.message || "Falha ao autenticar";

      Toast.show({
        type: "error",
        text1: "Erro na autenticação",
        text2: errorMessage,
      });
    } finally {
      setLoggingIn(false);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary-100 px-4">
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center text-black mb-10">
          <Leaf size={40} className="text-primary-500 mx-auto" />
          FIAP Farms
        </Text>

        {/* Input email */}
        <View className="mb-4">
          <Text className="text-black mb-1">E-mail</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl bg-white px-3">
            <Mail size={18} className="text-primary-500" />
            <TextInput
              className="flex-1 p-3 text-primary-500"
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A8B5DB"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Input senha */}
        <View className="mb-6">
          <Text className="text-black mb-1">Senha</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl bg-white px-3">
            <Lock size={18} className="text-primary-500" />
            <TextInput
              className="flex-1 p-3 text-primary-500"
              placeholderTextColor="#A8B5DB"
              placeholder="Digite sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loggingIn}
          className={`rounded-xl py-4 ${
            loggingIn ? "bg-primary-500/75" : "bg-primary-500"
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {loggingIn ? "Carregando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
