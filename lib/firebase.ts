// lib/firebase.ts
import { getApps, initializeApp } from "@react-native-firebase/app";

/**
 * Inicializa o Firebase nativo passando as opções do iOS explicitamente.
 * (Evita depender da detecção automática do .plist)
 */
export function ensureFirebase() {
  if (getApps().length) return;

  initializeApp({
    appId: "1:1055813156398:ios:1027c63e1993f6a1abe9bf", // GOOGLE_APP_ID
    apiKey: "AIzaSyBwKDGd_6_D4tkIftIoW59L7e9OUMVIL0g", // API_KEY
    projectId: "farms-fiap", // PROJECT_ID
    messagingSenderId: "1055813156398", // GCM_SENDER_ID
    // storageBucket pode ficar de fora; não é necessário p/ Auth
    // iosBundleId é opcional aqui
  } as any);
}
