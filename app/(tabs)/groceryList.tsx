import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

interface IGroceryItem {
  _id: string;
  item: string;
  isPurchased: boolean;
}

export default function CreateList() {
  const [groceries, setGroceries] = useState<IGroceryItem[]>([]);
  const [newGroceryValue, setNewGroceryValue] = useState<string>("");

  useEffect(() => {
    (async () => {
      const groceries = await AsyncStorage.getItem("groceries");
      if (groceries) {
        setGroceries(JSON.parse(groceries));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const x = await AsyncStorage.setItem(
        "groceries",
        JSON.stringify(groceries)
      );
    })();
  }, [groceries]);

  const renderItem = useCallback(
    ({ item, index }: { item: IGroceryItem; index: number }) => (
      <GroceryItem
        grocery={item}
        onCompleteGrocery={() => onCompleteGroceryItem(index)}
        onDeleteGroceryItem={() => onDeleteGroceryItem(index)}
      />
    ),
    []
  );

  const onCompleteGroceryItem = (id: number) => {
    setGroceries((prev) =>
      prev.map((item, index) =>
        id === index ? { ...item, isPurchased: !item.isPurchased } : { ...item }
      )
    );
  };

  const onDeleteGroceryItem = (id: number) => {
    console.log("Delete Item", id);
    setGroceries((prev) => prev.filter((item, index) => id !== index));
  };

  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          minWidth: "100%",
          maxWidth: 600,
          marginHorizontal: "auto",
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 20,
            minWidth: "100%",
            maxWidth: 600,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                gap: 4,
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 24 }}>
                Grocery List
              </Text>
              <SimpleLineIcons name="notebook" size={20} color={"gray"} />
            </View>

            <View>
              <View style={{ gap: 8, flexDirection: "row" }}>
                <TextInput
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 12,
                    height: 56,
                    borderWidth: 1,
                    borderColor: "gray",
                    paddingHorizontal: 16,
                    color: "#222",
                    flex: 1,
                  }}
                  onChangeText={(text) => setNewGroceryValue(text)}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    if (newGroceryValue === "") return;
                    setGroceries((prev) => [
                      ...prev,
                      {
                        item: newGroceryValue,
                        isPurchased: false,
                        _id: Date.now().toString(),
                      },
                    ]);
                    setNewGroceryValue("");
                  }}
                  value={newGroceryValue}
                />

                <Pressable
                  style={{
                    borderRadius: 8,
                    backgroundColor: "lightgray",
                    paddingHorizontal: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (newGroceryValue === "") return;
                    setGroceries((prev) => [
                      ...prev,
                      {
                        item: newGroceryValue,
                        isPurchased: false,
                        _id: Date.now().toString(),
                      },
                    ]);
                    setNewGroceryValue("");
                  }}
                >
                  <AntDesign name="plus" size={20} color={"gray"} />
                </Pressable>
              </View>
            </View>
          </View>

          <FlatList
            contentContainerStyle={{ paddingTop: 24 }}
            data={groceries}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={EmptyGroceryList}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

function GroceryItem({
  grocery,
  onCompleteGrocery,
  onDeleteGroceryItem,
}: {
  grocery: IGroceryItem;
  onCompleteGrocery: () => void;
  onDeleteGroceryItem: () => void;
}) {
  const swipeableRef = useRef<SwipeableMethods>(null);
  const renderRightActions = () => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        borderRadius: 12,
        flexDirection: "row",
        gap: 6,
        paddingHorizontal: 8,
      }}
      activeOpacity={0.7}
      onPress={onCompleteGrocery}
    >
      <Text style={{ color: "white" }}>
        {grocery.isPurchased ? "Undo" : "Done"}
      </Text>
      {!grocery.isPurchased && (
        <Ionicons name="checkmark-circle-outline" size={18} color={"white"} />
      )}
    </TouchableOpacity>
  );
  const renderLeftActions = () => (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 12,
      }}
      activeOpacity={0.7}
      onPress={() => {
        console.log("Jello Delete");
      }}
    >
      <Text style={{ color: "white", paddingHorizontal: 20 }}>Delete</Text>
    </TouchableOpacity>
  );
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableOpen={(direction) => {
        if (direction === "left") {
          onCompleteGrocery();
          swipeableRef.current?.close();
        } else if (direction === "right") {
          onDeleteGroceryItem();
        }
      }}
    >
      <View
        style={{
          position: "relative",
          backgroundColor: "#f5f5f5",
          paddingVertical: 12,
          paddingHorizontal: 14,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            color: grocery.isPurchased ? "gray" : "#222",
            // textDecorationStyle: grocery.isPurchased? ''
            textDecorationLine: grocery.isPurchased
              ? "underline line-through"
              : "none",
          }}
        >
          {grocery.item}
        </Text>
      </View>
    </Swipeable>
  );
}

function EmptyGroceryList() {
  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        paddingVertical: 20,
        gap: 16,
        borderRadius: 12,
        marginTop: 24,
        elevation: 2,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          fontWeight: "500",
          color: "gray",
        }}
      >
        Grocery List is Empty
      </Text>
      <Text style={{ textAlign: "center" }}>Add New Item to List</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
