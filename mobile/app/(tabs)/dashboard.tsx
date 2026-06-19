import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/colors";

const MOCK_PICKUPS = [
  { id: 1, date: "Jun 25, 2026", status: "scheduled", boxes: 12, address: "123 Main St" },
  { id: 2, date: "Jun 18, 2026", status: "completed", boxes: 8, address: "123 Main St" },
  { id: 3, date: "Jun 11, 2026", status: "completed", boxes: 15, address: "123 Main St" },
  { id: 4, date: "Jun 4, 2026", status: "completed", boxes: 7, address: "123 Main St" },
];

const STATS = [
  { label: "Total Pickups", value: "4", icon: "cube-outline", color: Colors.brand[100], iconColor: Colors.brand[600] },
  { label: "Boxes Recycled", value: "42", icon: "refresh-outline", color: Colors.green[100], iconColor: Colors.green[600] },
  { label: "CO₂ Saved", value: "63 lbs", icon: "leaf-outline", color: "#d1fae5", iconColor: "#059669" },
  { label: "Next Pickup", value: "Jun 25", icon: "calendar-outline", color: "#dbeafe", iconColor: Colors.blue[600] },
];

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 32 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {firstName} 👋</Text>
          <Text style={styles.subGreeting}>Here's your pickup overview.</Text>
        </View>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{user?.name?.[0] ?? "U"}</Text>
        </View>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        {STATS.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
              <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Schedule CTA */}
      <TouchableOpacity
        style={styles.scheduleCta}
        onPress={() => router.push("/(tabs)/schedule")}
      >
        <View>
          <Text style={styles.scheduleCtaTitle}>Schedule a pickup</Text>
          <Text style={styles.scheduleCtaSub}>Choose your date & time</Text>
        </View>
        <View style={styles.scheduleCtaIcon}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Pickup history */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Pickups</Text>
        {MOCK_PICKUPS.map((pickup) => (
          <View key={pickup.id} style={styles.pickupRow}>
            <View style={styles.pickupIcon}>
              <Ionicons name="cube-outline" size={20} color={Colors.stone[500]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.pickupDate}>{pickup.date}</Text>
              <Text style={styles.pickupSub}>{pickup.boxes} boxes · {pickup.address}</Text>
            </View>
            <View style={[styles.badge, pickup.status === "scheduled" ? styles.badgeBlue : styles.badgeGreen]}>
              <Ionicons
                name={pickup.status === "scheduled" ? "time-outline" : "checkmark-circle-outline"}
                size={11}
                color={pickup.status === "scheduled" ? Colors.blue[600] : Colors.green[700]}
              />
              <Text style={[styles.badgeText, pickup.status === "scheduled" ? styles.badgeTextBlue : styles.badgeTextGreen]}>
                {pickup.status === "scheduled" ? "Scheduled" : "Completed"}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Plan card */}
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <Text style={styles.planLabel}>YOUR PLAN</Text>
          <Ionicons name="card-outline" size={18} color={Colors.brand[200]} />
        </View>
        <Text style={styles.planName}>Monthly</Text>
        <Text style={styles.planPrice}>$49 / month · Renews Jul 18</Text>
        {["4 pickups/month", "Unlimited boxes", "Priority slots"].map((f) => (
          <View key={f} style={styles.planFeatureRow}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.brand[300]} />
            <Text style={styles.planFeatureText}>{f}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.managePlanBtn}>
          <Text style={styles.managePlanText}>Manage Plan</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone[50] },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 },
  greeting: { fontSize: 22, fontWeight: "800", color: Colors.stone[900] },
  subGreeting: { fontSize: 13, color: Colors.stone[500], marginTop: 2 },
  avatarCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.brand[200], alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 16, fontWeight: "800", color: Colors.brand[700] },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16, gap: 10, marginBottom: 16 },
  statCard: { backgroundColor: "#fff", borderRadius: 16, padding: 14, width: "47%", borderWidth: 1, borderColor: Colors.stone[100] },
  statIcon: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  statValue: { fontSize: 22, fontWeight: "800", color: Colors.stone[900] },
  statLabel: { fontSize: 11, color: Colors.stone[500], marginTop: 2 },
  scheduleCta: { marginHorizontal: 16, backgroundColor: Colors.brand[500], borderRadius: 16, padding: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24, shadowColor: Colors.brand[500], shadowOpacity: 0.35, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  scheduleCtaTitle: { fontSize: 17, fontWeight: "800", color: "#fff" },
  scheduleCtaSub: { fontSize: 13, color: Colors.brand[200], marginTop: 2 },
  scheduleCtaIcon: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  section: { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: Colors.stone[100] },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.stone[900], marginBottom: 14 },
  pickupRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.stone[50] },
  pickupIcon: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.stone[100], alignItems: "center", justifyContent: "center" },
  pickupDate: { fontSize: 14, fontWeight: "600", color: Colors.stone[900] },
  pickupSub: { fontSize: 12, color: Colors.stone[500], marginTop: 1 },
  badge: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  badgeBlue: { backgroundColor: Colors.blue[50] },
  badgeGreen: { backgroundColor: Colors.green[50] },
  badgeText: { fontSize: 11, fontWeight: "700" },
  badgeTextBlue: { color: Colors.blue[600] },
  badgeTextGreen: { color: Colors.green[700] },
  planCard: { marginHorizontal: 16, backgroundColor: Colors.brand[500], borderRadius: 18, padding: 18, marginBottom: 8 },
  planHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  planLabel: { fontSize: 10, fontWeight: "800", color: Colors.brand[200], letterSpacing: 1 },
  planName: { fontSize: 24, fontWeight: "800", color: "#fff", marginBottom: 2 },
  planPrice: { fontSize: 13, color: Colors.brand[200], marginBottom: 12 },
  planFeatureRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  planFeatureText: { fontSize: 13, color: Colors.brand[100] },
  managePlanBtn: { marginTop: 14, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  managePlanText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
