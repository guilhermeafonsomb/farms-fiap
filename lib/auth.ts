// app/lib/auth.ts
import auth from "@react-native-firebase/auth";
import { Platform } from "react-native";

// Emulador local: ajuste conforme onde seu app roda
// iOS Simulator usa 127.0.0.1; Android Emulator usa 10.0.2.2
const HOST = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
const USE_EMULATOR = process.env.NODE_ENV === "development";

let _authEmulatorInit = false;
/** Inicializa o Auth Emulator **depois** do Firebase App existir */
export function initAuthEmulator() {
  if (!USE_EMULATOR || _authEmulatorInit) return;
  _authEmulatorInit = true;
  try {
    auth().useEmulator(`http://${HOST}:9099`);
  } catch (e) {
    // Caso o app ainda não tenha sido inicializado, tente de novo no próximo tick
    setTimeout(() => {
      try {
        auth().useEmulator(`http://${HOST}:9099`);
      } catch {}
    }, 0);
  }
}

/** Faz login com e-mail/senha e retorna o usuário */
export async function signInWithEmail(email: string, password: string) {
  const { user } = await auth().signInWithEmailAndPassword(email, password);
  return user;
}

/** Retorna o ID token do usuário logado (para usar no Authorization: Bearer) */
export async function getIdToken(forceRefresh = false) {
  const user = auth().currentUser;
  if (!user) throw new Error("not_authenticated");
  return user.getIdToken(forceRefresh);
}

/** Observa mudanças de sessão (útil se quiser reagir a login/logout) */
export function onAuthChange(cb: (uid: string | null) => void) {
  return auth().onAuthStateChanged((u) => cb(u ? u.uid : null));
}
