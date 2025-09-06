// lib/config.ts
import { Platform } from "react-native";

// Emulador local: ajuste conforme onde seu app roda
// iOS Simulator usa 127.0.0.1; Android Emulator usa 10.0.2.2
const HOST = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";

export const BASE_URL = `http://${HOST}:5001/farms-fiap/southamerica-east1/api`;
