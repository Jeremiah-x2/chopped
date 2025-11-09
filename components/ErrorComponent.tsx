import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ErrorComponent() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={{
          paddingVertical: 20,
          alignItems: "center",
          gap: 16,
          backgroundColor: "#f1f1f1",
          borderRadius: 8,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "gray", fontSize: 20 }}>Error!</Text>
          <Text>Something went Wrong.</Text>
        </View>
        <Pressable
          // onPress={() => router.reload()}
          style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: "orange",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>Try Again</Text>
          <Feather name="alert-circle" color={"white"} />
        </Pressable>
      </View>
    </View>
  );
}
