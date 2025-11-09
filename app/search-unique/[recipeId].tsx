import { SPOONACULAR_API_KEY } from "@/utils/constants";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { useQuery } from "convex/react";
// import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
export default function RecipeDetails() {
  const searchParams = useLocalSearchParams();
  const router = useRouter();
  const titleContainerRef = useRef<View>(null);
  const {
    data: recipe,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [searchParams.recipeId],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://api.spoonacular.com/recipes/${searchParams.recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
        );
        return data;
      } catch (error) {
        console.log("An Error Occured", error);
        throw error;
      }
    },
  });

  if (isLoading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  if (error)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 18 }}>
          Something went wrong!
        </Text>
        <Pressable
          onPress={() => refetch()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: "orange",
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
            Retry
          </Text>
          <Ionicons name="alert-circle" color={"white"} size={20} />
        </Pressable>
      </View>
    );

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>
          <View style={{ position: "relative", width }}>
            <View
              style={{
                position: "absolute",
                width: "100%",
                // borderWidth: 2,
                // borderColor: "red",
                top: 0,
                zIndex: 2,
                paddingHorizontal: 16,
                paddingTop: 12,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={{
                  width: 36,
                  height: 36,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: 8,
                }}
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back" size={20} color={"white"} />
              </Pressable>
              <View style={styles.bookmarkHeartWrapper}>
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipe.aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
              </View>
            </View>
            <Image
              source={{ uri: recipe?.image }}
              style={{
                height: height * 0.5,
                flex: 1,
                width: "100%",
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                objectFit: "cover",
                backgroundColor: "white",
              }}
              resizeMode="center"
            />

            <View
              style={{
                position: "absolute",
                width: "100%",
                bottom: 0,
                zIndex: 2,
                paddingHorizontal: 32,
                transform: [{ translateY: "50%" }],
              }}
            >
              <View
                ref={titleContainerRef}
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 16,
                  paddingVertical: 20,
                  borderRadius: 24,
                  gap: 16,
                  elevation: 5,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: "#433232",
                      fontWeight: "700",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    {recipe?.title}
                  </Text>
                  <Text
                    style={{ textAlign: "center", color: "gray", fontSize: 14 }}
                  >
                    {recipe?.extendedIngredients.length} Ingredients
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Ionicons name="time-outline" color={"orange"} size={20} />
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {recipe?.readyInMinutes} min
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Ionicons name="flame-outline" color={"orange"} size={20} />
                    <Text style={{ color: "gray", fontSize: 12 }}>234 Cal</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FontAwesome
                      name="dot-circle-o"
                      color={"orange"}
                      size={20}
                    />
                    <Text style={{ color: "gray", fontSize: 12 }}>
                      {recipe?.servings} serve
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: 90,
            }}
          >
            <View style={{ gap: 16 }}>
              <Text
                style={{
                  fontWeight: "700",
                  paddingHorizontal: 16,
                  fontSize: 20,
                  color: "#1b1b1b",
                }}
              >
                Ingredients
              </Text>

              <View style={{ paddingHorizontal: 0 }}>
                <FlatList
                  data={recipe?.extendedIngredients}
                  horizontal
                  contentContainerStyle={{
                    marginHorizontal: 16,
                    paddingRight: 20,
                  }}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View style={{ width: 12 }}></View>
                  )}
                  renderItem={({ index, item }) => (
                    <View style={{ maxWidth: 80 }}>
                      <View
                        key={index}
                        style={{
                          width: 80,
                          height: 80,
                          //   borderWidth: 1,
                          borderColor: "orange",
                          borderRadius: 12,
                          backgroundColor: "#f5f5f5",

                          elevation: 2,
                        }}
                      >
                        <Image
                          source={{
                            uri: `https://spoonacular.com/cdn/ingredients_250x250/${item.image}`,
                          }}
                          style={{ flex: 1, height: "100%", width: "100%" }}
                          resizeMode="center"
                        />
                      </View>
                      <View style={{ marginTop: 2 }}>
                        <Text style={{ fontWeight: "500", fontSize: 12 }}>
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 10, color: "gray" }}>
                          {item.amount} {item.unit}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>

            <View style={{ gap: 16, marginTop: 24 }}>
              <Text
                style={{
                  fontWeight: "700",
                  paddingHorizontal: 16,
                  fontSize: 20,
                  color: "#1b1b1b",
                }}
              >
                Cooking instruction
              </Text>

              <FlatList
                data={recipe?.analyzedInstructions[0].steps}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 12 }}></View>
                )}
                renderItem={({ index, item }) => (
                  <View style={{ paddingHorizontal: 16 }}>
                    <View
                      key={index}
                      style={{
                        // width: 80,
                        // height: 80,
                        //   borderWidth: 1,
                        borderColor: "orange",
                        borderRadius: 16,
                        backgroundColor: "#f5f5f5",
                        // backgroundColor: "rgba(255, 154, 0, 0.1)",
                        elevation: 2,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "orange",
                          fontWeight: "600",
                          marginBottom: 8,
                        }}
                      >
                        Step {index + 1}
                      </Text>

                      <Text>{item.step}</Text>
                    </View>
                  </View>
                )}
              />

              <View style={{ height: 10 }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  heart: {
    // position: "absolute",
    // top: 4,
    // right: 4,
    backgroundColor: "orange",
    padding: 2,
    borderRadius: 100,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  bookmark: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  bookmarkHeartWrapper: { flexDirection: "row", alignItems: "center" },
});
