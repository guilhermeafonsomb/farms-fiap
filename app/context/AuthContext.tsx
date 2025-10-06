import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { account } from "../lib/appwrite";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  login: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica sessão ao montar
  useEffect(() => {
    async function checkSession() {
      try {
        const session = await account.get();
        setUser(session);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession({ email, password });
    const session = await account.get();
    setUser(session);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
