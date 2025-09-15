// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACTIVE = "#EAF4FF";
const INACTIVE = "#A9B9D8";
const TAB_HEIGHT = 84;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // ❌ KHÔNG chừa paddingBottom nữa — để nội dung có thể đi xuống dưới tab
        // sceneContainerStyle: { paddingBottom: TAB_HEIGHT + 16 },
        sceneContainerStyle: { backgroundColor: "#0C1E3A" }, // nền tối để không lộ góc trắng
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="wishlist" options={{ title: "Wishlist" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

/* ---------------- Custom TabBar (overlay) ---------------- */

function MyTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={["#0E1726", "#0C1E3A"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.wrap,
        {
          // 🔥 overlay tuyệt đối lên trên nội dung
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      <View style={styles.rail}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const iconName = getIconName(route.name as string, isFocused);

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.item} activeOpacity={0.9}>
              {isFocused ? (
                <LinearGradient colors={["#86C1FF", "#5A9CFF"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bubble}>
                  <Ionicons name={iconName} size={22} color={ACTIVE} />
                </LinearGradient>
              ) : (
                <View style={styles.iconBox}>
                  <Ionicons name={iconName} size={22} color={INACTIVE} />
                </View>
              )}
              <Text style={[styles.label, { color: isFocused ? ACTIVE : INACTIVE }]}>{String(label)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

function getIconName(name: string, focused: boolean) {
  switch (name) {
    case "index": return "bicycle";
    case "wishlist": return focused ? "heart" : "heart-outline";
    case "explore": return "compass-outline";
    case "cart": return "bag-handle-outline";
    case "profile": return "person-circle-outline";
    default: return "ellipse-outline";
  }
}

const styles = StyleSheet.create({
  wrap: {
    // ❗ Bỏ bo góc để không lộ “góc trắng” hai bên
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#0C1E3A", // nếu gradient không render kịp, vẫn tối
  },
  rail: {
    flexDirection: "row",
    height: TAB_HEIGHT,
    paddingHorizontal: 10,
    gap: 8,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 8,
    gap: 6,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: -8 }],
    ...Platform.select({
      ios: { shadowColor: "#5AA2FF", shadowOpacity: 0.45, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 8 },
    }),
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
});
