import { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/colors";

const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function ScheduleScreen() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const today = new Date();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [boxes, setBoxes] = useState("6–10");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDay(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d <= todayStart || d.getDay() === 0;
  }

  function formatDate(day: number) {
    return `${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`;
  }

  async function handleConfirm() {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
  }

  function reset() {
    setStep(1);
    setSelectedDate(null);
    setSelectedSlot(null);
    setAddress("");
    setNotes("");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.pageTitle}>Schedule a Pickup</Text>
      <Text style={styles.pageSub}>Choose a date, time, and we'll handle the rest.</Text>

      {/* Step indicators */}
      <View style={styles.steps}>
        {[{ n: 1, label: "Date & Time" }, { n: 2, label: "Details" }, { n: 3, label: "Confirmed" }].map(({ n, label }, i, arr) => (
          <View key={n} style={styles.stepRow}>
            <View style={[styles.stepDot, step >= n && styles.stepDotActive, step > n && styles.stepDotDone]}>
              {step > n
                ? <Ionicons name="checkmark" size={12} color="#fff" />
                : <Text style={[styles.stepNum, step >= n && styles.stepNumActive]}>{n}</Text>
              }
            </View>
            <Text style={[styles.stepLabel, step >= n && styles.stepLabelActive]}>{label}</Text>
            {i < arr.length - 1 && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>

      {/* STEP 1: Calendar + time */}
      {step === 1 && (
        <View>
          <View style={styles.card}>
            {/* Month nav */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={18} color={Colors.stone[600]} />
              </TouchableOpacity>
              <Text style={styles.monthLabel}>{MONTH_NAMES[viewMonth]} {viewYear}</Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={18} color={Colors.stone[600]} />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View style={styles.dayHeaderRow}>
              {DAY_NAMES.map(d => <Text key={d} style={styles.dayHeader}>{d}</Text>)}
            </View>

            {/* Day grid */}
            <View style={styles.dayGrid}>
              {Array.from({ length: firstDay }).map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const disabled = isDisabled(day);
                const dateStr = formatDate(day);
                const selected = selectedDate === dateStr;
                return (
                  <TouchableOpacity
                    key={day}
                    disabled={disabled}
                    onPress={() => setSelectedDate(dateStr)}
                    style={[styles.dayCell, selected && styles.dayCellSelected]}
                  >
                    <Text style={[styles.dayText, disabled && styles.dayTextDisabled, selected && styles.dayTextSelected]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Time slots */}
          {selectedDate && (
            <View style={styles.card}>
              <View style={styles.timeSlotsHeader}>
                <Ionicons name="time-outline" size={16} color={Colors.brand[500]} />
                <Text style={styles.cardTitle}>Available times for {selectedDate}</Text>
              </View>
              <View style={styles.slotsGrid}>
                {TIME_SLOTS.map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[styles.slotBtn, selectedSlot === slot && styles.slotBtnSelected]}
                    onPress={() => setSelectedSlot(slot)}
                  >
                    <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextSelected]}>{slot}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={[styles.primaryBtn, (!selectedDate || !selectedSlot) && styles.primaryBtnDisabled]}
            disabled={!selectedDate || !selectedSlot}
            onPress={() => setStep(2)}
          >
            <Text style={styles.primaryBtnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* STEP 2: Details */}
      {step === 2 && (
        <View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pickup details</Text>

            <Text style={styles.label}>Pickup address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="123 Main St, City, State 00000"
              placeholderTextColor={Colors.stone[400]}
            />

            <Text style={[styles.label, { marginTop: 14 }]}>Estimated boxes</Text>
            <View style={styles.boxOptions}>
              {["1–5", "6–10", "11–20", "20–40", "40+"].map((v) => (
                <TouchableOpacity
                  key={v}
                  style={[styles.boxOpt, boxes === v && styles.boxOptSelected]}
                  onPress={() => setBoxes(v)}
                >
                  <Text style={[styles.boxOptText, boxes === v && styles.boxOptTextSelected]}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Driver notes (optional)</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. Boxes at the side gate. Please call on arrival."
              placeholderTextColor={Colors.stone[400]}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Pickup summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryLeft}>
                <Ionicons name="calendar-outline" size={14} color={Colors.stone[500]} />
                <Text style={styles.summaryLabel}>Date</Text>
              </View>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={styles.summaryLeft}>
                <Ionicons name="time-outline" size={14} color={Colors.stone[500]} />
                <Text style={styles.summaryLabel}>Time</Text>
              </View>
              <Text style={styles.summaryValue}>{selectedSlot}</Text>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStep(1)}>
              <Text style={styles.secondaryBtnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryBtn, { flex: 2 }, (!address || loading) && styles.primaryBtnDisabled]}
              disabled={!address || loading}
              onPress={handleConfirm}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : <Text style={styles.primaryBtnText}>Confirm Pickup</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 3: Confirmed */}
      {step === 3 && (
        <View style={styles.confirmedContainer}>
          <View style={styles.confirmedIcon}>
            <Ionicons name="checkmark-circle" size={56} color={Colors.green[500]} />
          </View>
          <Text style={styles.confirmedTitle}>Pickup confirmed!</Text>
          <Text style={styles.confirmedText}>
            We'll be there on <Text style={{ fontWeight: "700" }}>{selectedDate}</Text> between{" "}
            <Text style={{ fontWeight: "700" }}>{selectedSlot}</Text>.
          </Text>
          <Text style={styles.confirmedEmail}>
            A confirmation has been sent to <Text style={{ fontWeight: "700" }}>{user?.email}</Text>.
          </Text>

          <TouchableOpacity style={[styles.primaryBtn, { marginTop: 28, width: "100%" }]} onPress={reset}>
            <Text style={styles.primaryBtnText}>Schedule Another</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.stone[50] },
  pageTitle: { fontSize: 24, fontWeight: "800", color: Colors.stone[900], paddingHorizontal: 20 },
  pageSub: { fontSize: 14, color: Colors.stone[500], paddingHorizontal: 20, marginTop: 4, marginBottom: 20 },
  steps: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 20 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 5, flex: 1 },
  stepDot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: Colors.stone[300], alignItems: "center", justifyContent: "center" },
  stepDotActive: { borderColor: Colors.brand[500] },
  stepDotDone: { backgroundColor: Colors.brand[500], borderColor: Colors.brand[500] },
  stepNum: { fontSize: 11, fontWeight: "700", color: Colors.stone[400] },
  stepNumActive: { color: Colors.brand[600] },
  stepLabel: { fontSize: 10, fontWeight: "600", color: Colors.stone[400] },
  stepLabelActive: { color: Colors.brand[600] },
  stepLine: { flex: 1, height: 1, backgroundColor: Colors.stone[200] },
  card: { backgroundColor: "#fff", borderRadius: 18, padding: 16, marginHorizontal: 16, marginBottom: 14, borderWidth: 1, borderColor: Colors.stone[100] },
  monthNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  navBtn: { padding: 6, borderRadius: 8, backgroundColor: Colors.stone[100] },
  monthLabel: { fontSize: 16, fontWeight: "700", color: Colors.stone[900] },
  dayHeaderRow: { flexDirection: "row", marginBottom: 6 },
  dayHeader: { flex: 1, textAlign: "center", fontSize: 11, fontWeight: "700", color: Colors.stone[400] },
  dayGrid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: { width: "14.28%", aspectRatio: 1, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  dayCellSelected: { backgroundColor: Colors.brand[500] },
  dayText: { fontSize: 14, fontWeight: "600", color: Colors.stone[700] },
  dayTextDisabled: { color: Colors.stone[200] },
  dayTextSelected: { color: "#fff" },
  timeSlotsHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: Colors.stone[900] },
  slotsGrid: { gap: 8 },
  slotBtn: { borderWidth: 2, borderColor: Colors.stone[200], borderRadius: 12, paddingVertical: 12, paddingHorizontal: 14 },
  slotBtnSelected: { borderColor: Colors.brand[500], backgroundColor: Colors.brand[50] },
  slotText: { fontSize: 14, fontWeight: "600", color: Colors.stone[700] },
  slotTextSelected: { color: Colors.brand[700] },
  label: { fontSize: 13, fontWeight: "600", color: Colors.stone[700], marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: Colors.stone[200], borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: Colors.stone[900], backgroundColor: "#fff" },
  textarea: { height: 80, paddingTop: 12 },
  boxOptions: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  boxOpt: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.stone[200] },
  boxOptSelected: { borderColor: Colors.brand[500], backgroundColor: Colors.brand[50] },
  boxOptText: { fontSize: 13, fontWeight: "600", color: Colors.stone[600] },
  boxOptTextSelected: { color: Colors.brand[700] },
  summaryCard: { backgroundColor: Colors.stone[100], borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 14 },
  summaryTitle: { fontSize: 14, fontWeight: "700", color: Colors.stone[900], marginBottom: 10 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  summaryLeft: { flexDirection: "row", alignItems: "center", gap: 6 },
  summaryLabel: { fontSize: 13, color: Colors.stone[500] },
  summaryValue: { fontSize: 13, fontWeight: "600", color: Colors.stone[900] },
  btnRow: { flexDirection: "row", gap: 10, paddingHorizontal: 16 },
  primaryBtn: { backgroundColor: Colors.brand[500], borderRadius: 14, paddingVertical: 16, alignItems: "center", marginHorizontal: 16, marginTop: 4 },
  primaryBtnDisabled: { backgroundColor: Colors.stone[200] },
  primaryBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  secondaryBtn: { flex: 1, backgroundColor: "#fff", borderRadius: 14, paddingVertical: 16, alignItems: "center", borderWidth: 1.5, borderColor: Colors.stone[200] },
  secondaryBtnText: { color: Colors.stone[700], fontWeight: "700", fontSize: 15 },
  confirmedContainer: { alignItems: "center", paddingHorizontal: 24, paddingTop: 32 },
  confirmedIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.green[50], alignItems: "center", justifyContent: "center", marginBottom: 20 },
  confirmedTitle: { fontSize: 26, fontWeight: "800", color: Colors.stone[900], marginBottom: 10 },
  confirmedText: { fontSize: 15, color: Colors.stone[600], textAlign: "center", marginBottom: 8, lineHeight: 22 },
  confirmedEmail: { fontSize: 13, color: Colors.stone[500], textAlign: "center" },
});
