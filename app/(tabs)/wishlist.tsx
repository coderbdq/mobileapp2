import { Text, View } from "react-native";

export default function WishlistScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0C1E3A",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
        Wishlist
      </Text>
    </View>
  );
}
