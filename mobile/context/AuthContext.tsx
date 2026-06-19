import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

const DEMO_USER: User = {
  id: "1",
  name: "Demo User",
  email: "demo@cardboardcaddie.com",
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("user").then((val) => {
      if (val) setUser(JSON.parse(val));
      setLoading(false);
    });
  }, []);

  async function signIn(email: string, password: string): Promise<boolean> {
    if (
      email === "demo@cardboardcaddie.com" &&
      password === "demo1234"
    ) {
      await SecureStore.setItemAsync("user", JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      return true;
    }
    return false;
  }

  async function signOut() {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
