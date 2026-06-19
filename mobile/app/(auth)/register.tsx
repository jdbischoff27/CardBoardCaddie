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

const PLANS = [
  {
    id: "onetime",
    name: "One-Time Pickup",
    price: "$29",
    per: "per pickup",
    features: ["Up to 20 boxes", "Next-day pickup"],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$49",
    per: "/month",
    features: ["Unlimited boxes", "4 pickups/month", "Priority slots"],
    popular: true,
  },
];

export default function RegisterScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Password too short", "Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    // Demo: sign in with demo account
    const ok = await signIn("demo@cardboardcaddie.com", "demo1234");
    setLoading(false);
    if (ok) {
      router.replace("/(tabs)/dashboard");
    } else {
      Alert.alert("Error", "Something went wrong. Please try again.");
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

          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Get started in 2 minutes</Text>

          {/* Step indicator */}
          <View style={styles.steps}>
            {[1, 2].map((s) => (
              <View key={s} style={styles.stepRow}>
                <View style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                  {step > s
                    ? <Ionicons name="checkmark" size={14} color="#fff" />
                    : <Text style={[styles.stepNum, step >= s && styles.stepNumActive]}>{s}</Text>
                  }
                </View>
                <Text style={[styles.stepLabel, step >= s && styles.stepLabelActive]}>
                  {s === 1 ? "Choose plan" : "Your details"}
                </Text>
                {s < 2 && <View style={styles.stepLine} />}
              </View>
            ))}
          </View>

          <View style={styles.card}>

            {/* Step 1: Plan selection */}
            {step === 1 && (
              <View>
                <Text style={styles.sectionTitle}>Select a plan</Text>
                {PLANS.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[styles.planCard, selectedPlan === plan.id && styles.planCardSelected]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                      </View>
                    )}
                    <View style={styles.planHeader}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      <View style={styles.planPriceRow}>
                        <Text style={styles.planPrice}>{plan.price}</Text>
                        <Text style={styles.planPer}>{plan.per}</Text>
                      </View>
                    </View>
                    <View style={styles.planFeatures}>
                      {plan.features.map((f) => (
                        <View key={f} style={styles.featureRow}>
                          <Ionicons name="checkmark-circle" size={14} color={Colors.green[500]} />
                          <Text style={styles.featureText}>{f}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={[styles.radio, selectedPlan === plan.id && styles.radioSelected]}>
                      {selectedPlan === plan.id && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.btn} onPress={() => setStep(2)}>
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <View>
                <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
                  <Ionicons name="arrow-back" size={16} color={Colors.stone[500]} />
                  <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Your details</Text>

                <Text style={styles.label}>Full name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Jane Smith"
                  placeholderTextColor={Colors.stone[400]}
                  autoCapitalize="words"
                />

                <Text style={[styles.label, { marginTop: 14 }]}>Email address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="jane@example.com"
                  placeholderTextColor={Colors.stone[400]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Min. 8 characters"
                    placeholderTextColor={Colors.stone[400]}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={Colors.stone[400]} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.btn, { marginTop: 20 }, loading && styles.btnDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading
                    ? <ActivityIndicator color="#fff" />
                    : <Text style={styles.btnText}>Create Account</Text>
                  }
                </TouchableOpacity>

                <Text style={styles.terms}>
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign in</Text>
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
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 28 },
  logoBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.brand[500], alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 22, fontWeight: "800", color: Colors.stone[900] },
  title: { fontSize: 28, fontWeight: "800", color: Colors.stone[900], marginBottom: 4 },
  subtitle: { fontSize: 15, color: Colors.stone[500], marginBottom: 24 },
  steps: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.stone[200], alignItems: "center", justifyContent: "center" },
  stepDotActive: { backgroundColor: Colors.brand[500] },
  stepNum: { fontSize: 12, fontWeight: "700", color: Colors.stone[400] },
  stepNumActive: { color: "#fff" },
  stepLabel: { fontSize: 12, fontWeight: "600", color: Colors.stone[400] },
  stepLabelActive: { color: Colors.stone[800] },
  stepLine: { width: 28, height: 1, backgroundColor: Colors.stone[200], marginHorizontal: 4 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.stone[900], marginBottom: 16 },
  planCard: { borderWidth: 2, borderColor: Colors.stone[200], borderRadius: 14, padding: 14, marginBottom: 12, position: "relative" },
  planCardSelected: { borderColor: Colors.brand[500], backgroundColor: Colors.brand[50] },
  popularBadge: { position: "absolute", top: -1, right: 12, backgroundColor: Colors.brand[500], paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  popularText: { color: "#fff", fontSize: 9, fontWeight: "800", letterSpacing: 0.5 },
  planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  planName: { fontSize: 15, fontWeight: "700", color: Colors.stone[900] },
  planPriceRow: { flexDirection: "row", alignItems: "baseline", gap: 2 },
  planPrice: { fontSize: 18, fontWeight: "800", color: Colors.brand[600] },
  planPer: { fontSize: 12, color: Colors.stone[400] },
  planFeatures: { flexDirection: "row", gap: 12 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  featureText: { fontSize: 12, color: Colors.stone[500] },
  radio: { position: "absolute", top: 14, right: 14, width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: Colors.stone[300], alignItems: "center", justifyContent: "center" },
  radioSelected: { borderColor: Colors.brand[500], backgroundColor: Colors.brand[500] },
  radioDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#fff" },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 16 },
  backText: { fontSize: 14, color: Colors.stone[500] },
  label: { fontSize: 13, fontWeight: "600", color: Colors.stone[700], marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: Colors.stone[200], borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: Colors.stone[900], marginBottom: 4, backgroundColor: "#fff" },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  eyeBtn: { position: "absolute", right: 14, top: 13 },
  btn: { backgroundColor: Colors.brand[500], borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  btnDisabled: { backgroundColor: Colors.brand[300] },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  terms: { fontSize: 11, color: Colors.stone[400], textAlign: "center", marginTop: 12 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24, paddingBottom: 32 },
  footerText: { color: Colors.stone[600], fontSize: 14 },
  footerLink: { color: Colors.brand[600], fontWeight: "700", fontSize: 14 },
});
