import { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/colors";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    const ok = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);
    if (ok) {
      router.replace("/(tabs)/dashboard");
    } else {
      Alert.alert("Invalid credentials", "Check your email and password and try again.");
    }
  }

  return (
    <LinearGradient colors={[Colors.brand[50], "#ffffff"]} style={styles.gradient}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Ionicons name="cube-outline" size={22} color="#fff" />
            </View>
            <Text style={styles.logoText}>
              Cardboard<Text style={{ color: Colors.brand[500] }}>Caddie</Text>
            </Text>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          {/* Demo hint */}
          <View style={styles.hint}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.brand[600]} />
            <Text style={styles.hintText}>
              Demo: <Text style={styles.hintCode}>demo@cardboardcaddie.com</Text> / <Text style={styles.hintCode}>demo1234</Text>
            </Text>
          </View>

          {/* Form */}
          <View style={styles.card}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={Colors.stone[400]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={Colors.stone[400]}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.stone[400]} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.btnText}>Sign in</Text>
              }
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24, paddingTop: 72 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 32 },
  logoBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.brand[500], alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 22, fontWeight: "800", color: Colors.stone[900] },
  title: { fontSize: 30, fontWeight: "800", color: Colors.stone[900], marginBottom: 4 },
  subtitle: { fontSize: 15, color: Colors.stone[500], marginBottom: 24 },
  hint: { backgroundColor: Colors.brand[50], borderWidth: 1, borderColor: Colors.brand[200], borderRadius: 12, padding: 12, flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 24 },
  hintText: { fontSize: 13, color: Colors.brand[700], flex: 1 },
  hintCode: { fontWeight: "700" },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  label: { fontSize: 13, fontWeight: "600", color: Colors.stone[700], marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: Colors.stone[200], borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: Colors.stone[900], marginBottom: 4, backgroundColor: "#fff" },
  passwordRow: { flexDirection: "row", alignItems: "center", gap: 0, marginBottom: 4 },
  eyeBtn: { position: "absolute", right: 14, top: 13 },
  btn: { backgroundColor: Colors.brand[500], borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 20 },
  btnDisabled: { backgroundColor: Colors.brand[300] },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 28, paddingBottom: 32 },
  footerText: { color: Colors.stone[600], fontSize: 14 },
  footerLink: { color: Colors.brand[600], fontWeight: "700", fontSize: 14 },
});
