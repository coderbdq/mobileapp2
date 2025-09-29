// app/(tabs)/index.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProducts } from "../../hooks/useProducts";
import { API_BASE_URL } from "../api/config";

const { width } = Dimensions.get("window");
const H_PADDING = 20;

export default function TabIndexScreen() {
  const { data: products, isLoading, isError, refetch } = useProducts(30);

  return (
    <LinearGradient
      colors={["#0E1726", "#0C1E3A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Bike</Text>
          <Pressable style={styles.searchBtn} onPress={() => refetch()}>
            <Ionicons name="search" size={22} />
          </Pressable>
        </View>

        {/* Promo Card */}
        <LinearGradient
          colors={["#1F2C45", "#1B2B4E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promo}
        >
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={styles.promoOff}>30% Off</Text>
            <View style={{ height: 14 }} />
          </View>

          {/* Ảnh demo (có thể thay = banner API nếu backend có) */}
          <Image
            source={require("../../assets/images/products/peugeot-lr01.jpg")}
            contentFit="contain"
            cachePolicy="memory-disk"
            style={styles.promoImg}
          />
        </LinearGradient>

        {/* Filters row */}
        <View style={styles.filterRow}>
          <FilterIcon icon={<Ionicons name="bicycle" size={18} />} />
          <FilterIcon icon={<Ionicons name="flash" size={18} />} />
          <FilterIcon
            icon={<MaterialCommunityIcons name="speedometer" size={18} />}
          />
          <FilterIcon icon={<MaterialCommunityIcons name="terrain" size={18} />} />
          <FilterIcon icon={<Ionicons name="settings-outline" size={18} />} />
        </View>

        {/* Segments */}
        <View style={styles.segmentRow}>
          <Segment label="All" active />
          <Segment label="Road" />
          <Segment label="MTB" />
          <Segment label="Helmet" />
        </View>

        {/* Loading/Error */}
        {isLoading && (
          <View style={{ paddingTop: 40 }}>
            <ActivityIndicator color="#9EC5FF" />
            <Text
              style={{
                color: "#C9D6FF",
                textAlign: "center",
                marginTop: 8,
              }}
            >
              Loading…
            </Text>
          </View>
        )}

        {isError && (
          <Text style={{ color: "tomato", textAlign: "center", marginTop: 20 }}>
            Lỗi load dữ liệu. Kiểm tra lại API_BASE_URL hoặc Laravel server!
          </Text>
        )}

        {/* Cards grid */}
        {!isLoading && !isError && (
          <View style={styles.grid}>
            {products?.map((p) => {
              const uri =
                p.image_url && !p.image_url.startsWith("http")
                  ? `${API_BASE_URL}${p.image_url}`
                  : p.image_url || undefined;

              return (
                <ProductCard
                  key={p.id}
                  title={p.title}
                  subtitle={p.subtitle}
                  price={p.priceText}
                  imageUrl={uri}
                  liked={Math.random() > 0.7}
                  accent={Math.random() > 0.6}
                />
              );
            })}
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- tiny UI atoms ---------- */

function FilterIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <LinearGradient
      colors={["#1C2742", "#22335A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.filter}
    >
      <View style={{ opacity: 0.9 }}>{icon}</View>
    </LinearGradient>
  );
}

function Segment({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <LinearGradient
      colors={active ? ["#2B7BFF", "#6AA0FF"] : ["#19233B", "#1B2B4E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.segment, active && { shadowOpacity: 0.35, elevation: 6 }]}
    >
      <Text
        style={[styles.segmentText, active && { color: "#fff", fontWeight: "700" }]}
      >
        {label}
      </Text>
    </LinearGradient>
  );
}

function Heart({ filled }: { filled?: boolean }) {
  return (
    <View style={styles.heartWrap}>
      <Ionicons
        name={filled ? "heart" : "heart-outline"}
        size={18}
        color={filled ? "#FF6B81" : "#fff"}
      />
    </View>
  );
}

function ProductCard({
  title,
  subtitle,
  price,
  imageUrl,
  liked,
  accent,
}: {
  title: string;
  subtitle?: string;
  price: string;
  imageUrl?: string;
  liked?: boolean;
  accent?: boolean;
}) {
  return (
    <LinearGradient
      colors={accent ? ["#2A53DB", "#3E6BFF"] : ["#1A2237", "#1B2B4E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Heart filled={liked} />
      <Image
        source={
          imageUrl
            ? { uri: imageUrl }
            : require("../../assets/images/products/peugeot-lr01.jpg")
        }
        style={styles.cardImg}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <View style={{ gap: 2 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.cardSub}>{subtitle}</Text>}
      </View>
      <Text style={styles.cardPrice}>{price}</Text>
    </LinearGradient>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  header: {
    paddingTop: 24,
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#89C3FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  promo: {
    marginTop: 18,
    marginHorizontal: H_PADDING,
    height: 160,
    borderRadius: 22,
    padding: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  promoOff: {
    color: "#EAF2FF",
    fontSize: 30,
    fontWeight: "800",
  },
  promoImg: {
    position: "absolute",
    right: -30,
    top: -10,
    width: width * 0.6,
    height: 220,
    opacity: 0.95,
  },

  filterRow: {
    marginTop: 16,
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    gap: 12,
  },
  filter: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  segmentRow: {
    marginTop: 16,
    paddingHorizontal: H_PADDING,
    flexDirection: "row",
    gap: 10,
  },
  segment: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  segmentText: {
    color: "#C9D6FF",
    fontSize: 13,
    fontWeight: "600",
  },

  grid: {
    paddingHorizontal: H_PADDING,
    paddingTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  card: {
    width: (width - H_PADDING * 2 - 12) / 2,
    padding: 12,
    borderRadius: 18,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  cardImg: {
    width: "100%",
    height: 110,
    borderRadius: 14,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#E9F0FF",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.2,
  },
  cardSub: {
    color: "#C4D1F7",
    fontWeight: "700",
    fontSize: 11,
    opacity: 0.95,
  },
  cardPrice: {
    marginTop: 4,
    color: "#D7E5FF",
    fontSize: 12,
    fontWeight: "700",
  },
  heartWrap: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.25)",
  },
});
