import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateList() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "baseline",
            gap: 4,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 24 }}>Grocery List</Text>
          <SimpleLineIcons name="notebook" size={20} color={"gray"} />
        </View>

        <View>
          <View>
            <TextInput
              style={{
                backgroundColor: "#f5f5f5",
                borderRadius: 12,
                height: 56,
                borderWidth: 1,
                borderColor: "orange",
                paddingHorizontal: 16,
                color: "#222",
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
