// app/(tabs)/index.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image"; // dùng expo-image để tải/cached ảnh mượt Android

const { width } = Dimensions.get("window");
const H_PADDING = 20;

// Tạo link ảnh công khai theo từ khóa (Unsplash Source, không cần API key)
const imageFromKeywords = (kw: string, w = 800, h = 600) =>
  `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(kw)}`;

// Danh sách sản phẩm: dùng keywords thay vì link ảnh cố định
const PRODUCTS = [
  { title: "Road Bike",      subtitle: "PEUGEOT - LR01",  price: "$ 1,999.99", keywords: "road bike bicycle", liked: true },
  { title: "Road Helmet",    subtitle: "SMITH - Trade",   price: "$ 120",       keywords: "bicycle helmet",    accent: true },
  { title: "Gravel Bike",    subtitle: "Canyon - Grizl",  price: "$ 2,399",     keywords: "gravel bike" },
  { title: "Gloves",         subtitle: "Giro - Classic",  price: "$ 35",        keywords: "cycling gloves" },
  { title: "City Bike",      subtitle: "VanMoof - S3",    price: "$ 2,298",     keywords: "city bike urban" },
  { title: "MTB Helmet",     subtitle: "Fox - Rampage",   price: "$ 180",       keywords: "mountain bike helmet", accent: true },
  { title: "Action Cam",     subtitle: "GoPro - Hero",    price: "$ 299",       keywords: "action camera gopro cycling" },
  { title: "Bike Lock",      subtitle: "Kryptonite - U",  price: "$ 59",        keywords: "bike lock u-lock" },
  { title: "Cycling Jersey", subtitle: "Rapha - Pro",     price: "$ 125",       keywords: "cycling jersey" },
  { title: "Sunglasses",     subtitle: "Oakley - Sutro",  price: "$ 149",       keywords: "cycling sunglasses" },
  { title: "Bottle Cage",    subtitle: "Elite - Custom",  price: "$ 18",        keywords: "bike bottle cage" },
  { title: "Bike Light",     subtitle: "Cygolite - 850",  price: "$ 69",        keywords: "bike front light" },
];

export default function TabIndexScreen() {
  return (
    <LinearGradient
      colors={["#0E1726", "#0C1E3A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 /* chừa chỗ cho tab overlay */ }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Bike</Text>
          <Pressable style={styles.searchBtn}>
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

          {/* Ảnh demo xe đạp trong promo */}
          <Image
            source={{ uri: imageFromKeywords("road bike bicycle", 900, 600) }}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={200}
            style={styles.promoImg}
          />
        </LinearGradient>

        {/* Filters row */}
        <View style={styles.filterRow}>
          <FilterIcon icon={<Ionicons name="bicycle" size={18} />} />
          <FilterIcon icon={<Ionicons name="flash" size={18} />} />
          <FilterIcon icon={<MaterialCommunityIcons name="speedometer" size={18} />} />
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

        {/* Cards grid */}
        <View style={styles.grid}>
          {PRODUCTS.map((p, idx) => (
            <ProductCard
              key={idx}
              title={p.title}
              subtitle={p.subtitle}
              price={p.price}
              keywords={p.keywords}
              liked={p.liked}
              accent={p.accent}
            />
          ))}
        </View>

        {/* spacer nhỏ để tránh bubble tab che chữ cuối */}
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
      <Text style={[styles.segmentText, active && { color: "#fff", fontWeight: "700" }]}>{label}</Text>
    </LinearGradient>
  );
}

function Heart({ filled }: { filled?: boolean }) {
  return (
    <View style={styles.heartWrap}>
      <Ionicons name={filled ? "heart" : "heart-outline"} size={18} color={filled ? "#FF6B81" : "#fff"} />
    </View>
  );
}

function ProductCard({
  title,
  subtitle,
  price,
  keywords,
  liked,
  accent,
}: {
  title: string;
  subtitle: string;
  price: string;
  keywords?: string;
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

      {/* Ảnh theo từ khóa (cache + transition mượt) */}
      <Image
        source={{ uri: imageFromKeywords(keywords || title, 800, 600) }}
        style={styles.cardImg}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
      />

      <View style={{ gap: 2 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSub}>{subtitle}</Text>
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
    width: (width - H_PADDING * 2 - 12) / 2, // 2 cột
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
