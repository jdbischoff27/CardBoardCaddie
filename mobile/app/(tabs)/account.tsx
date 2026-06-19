import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/colors";

const MENU_ITEMS = [
  { icon: "card-outline", label: "Manage Plan", sub: "Monthly · $49/mo" },
  { icon: "notifications-outline", label: "Notifications", sub: "Email & push alerts" },
  { icon: "location-outline", label: "Saved Addresses", sub: "1 address saved" },
  { icon: "shield-checkmark-outline", label: "Privacy & Security", sub: "" },
  { icon: "help-circle-outline", label: "Help & Support", sub: "" },
];

export default function AccountScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  async function handleSignOut() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/(auth)/login");
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
    >
      <Text style={styles.pageTitle}>Account</Text>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user?.name?.[0] ?? "U"}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
        <View style={styles.planBadge}>
          <Text style={styles.planBadgeText}>Monthly</Text>
        </View>
      </View>

      {/* Impact card */}
      <View style={styles.impactCard}>
        <View style={styles.impactHeader}>
          <Ionicons name="leaf-outline" size={18} color={Colors.green[600]} />
          <Text style={styles.impactTitle}>Your Environmental Impact</Text>
        </View>
        <View style={styles.impactStats}>
          <View style={styles.impactStat}>
            <Text style={styles.impactValue}>42</Text>
            <Text style={styles.impactLabel}>Boxes recycled</Text>
          </View>
          <View style={styles.impactDivider} />
          <View style={styles.impactStat}>
            <Text style={[styles.impactValue, { color: Colors.green[600] }]}>63 lbs</Text>
            <Text style={styles.impactLabel}>CO₂ saved</Text>
          </View>
          <View style={styles.impactDivider} />
          <View style={styles.impactStat}>
            <Text style={styles.impactValue}>3.1</Text>
            <Text style={styles.impactLabel}>Trees equiv.</Text>
          </View>
        </View>
        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.progressLabel}>70% to your next milestone</Text>
      </View>

      {/* Menu items */}
      <View style={styles.menuCard}>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuRowBorder]}
          >
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={20} color={Colors.stone[600]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.sub ? <Text style={styles.menuSub}>{item.sub}</Text> : null}
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.stone[300]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={18} color={Colors.red[600]} />
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>CardboardCaddie v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone[50] },
  pageTitle: { fontSize: 24, fontWeight: "800", color: Colors.stone[900], paddingHorizontal: 20, marginBottom: 20 },
  profileCard: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: Colors.stone[100] },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.brand[200], alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 22, fontWeight: "800", color: Colors.brand[700] },
  profileName: { fontSize: 17, fontWeight: "700", color: Colors.stone[900] },
  profileEmail: { fontSize: 13, color: Colors.stone[500], marginTop: 2 },
  planBadge: { backgroundColor: Colors.brand[100], paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  planBadgeText: { fontSize: 12, fontWeight: "700", color: Colors.brand[700] },
  impactCard: { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: Colors.stone[100] },
  impactHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 14 },
  impactTitle: { fontSize: 15, fontWeight: "700", color: Colors.stone[900] },
  impactStats: { flexDirection: "row", marginBottom: 14 },
  impactStat: { flex: 1, alignItems: "center" },
  impactDivider: { width: 1, backgroundColor: Colors.stone[100] },
  impactValue: { fontSize: 20, fontWeight: "800", color: Colors.stone[900] },
  impactLabel: { fontSize: 11, color: Colors.stone[500], marginTop: 2 },
  progressBarBg: { height: 6, backgroundColor: Colors.stone[100], borderRadius: 3, marginBottom: 6 },
  progressBarFill: { width: "70%", height: 6, backgroundColor: Colors.green[400], borderRadius: 3 },
  progressLabel: { fontSize: 11, color: Colors.stone[500] },
  menuCard: { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 18, marginBottom: 14, borderWidth: 1, borderColor: Colors.stone[100], overflow: "hidden" },
  menuRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.stone[50] },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.stone[100], alignItems: "center", justifyContent: "center" },
  menuLabel: { fontSize: 15, fontWeight: "600", color: Colors.stone[800] },
  menuSub: { fontSize: 12, color: Colors.stone[500], marginTop: 1 },
  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginHorizontal: 16, backgroundColor: Colors.red[50], borderRadius: 14, paddingVertical: 14, marginBottom: 16 },
  signOutText: { fontSize: 15, fontWeight: "700", color: Colors.red[600] },
  versionText: { textAlign: "center", fontSize: 12, color: Colors.stone[400] },
});
