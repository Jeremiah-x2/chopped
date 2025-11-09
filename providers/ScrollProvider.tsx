import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          // paddingHorizontal: 16,
          height: "100%",
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
