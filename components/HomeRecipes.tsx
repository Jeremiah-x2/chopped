import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { usePaginatedQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeRecipes({
  reverse = false,
}: {
  reverse?: boolean;
}) {
  const router = useRouter();
  const {
    isLoading,
    results: recipes,
    loadMore,
  } = usePaginatedQuery(
    api.recipes.getRecipesPaginated,
    {},
    { initialNumItems: 12 }
  );

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton
            show={isLoading}
            height={150}
            width={"100%"}
            colorMode="light"
            radius={14}
          >
            {recipes[0] && (
              <Pressable
                onPress={() => router.push(`${recipes[0].id}`)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![0].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![0].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[1] && (
              <Pressable
                onPress={() => router.push(`${recipes[1].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![1].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![1].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[2] && (
              <Pressable
                onPress={() => router.push(`${recipes[2].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![2].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![2].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[3] && (
              <Pressable
                onPress={() => router.push(`${recipes[3].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![3].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![3].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>

          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[4] && (
              <Pressable
                onPress={() => router.push(`${recipes[4].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![4].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![4].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={150} width={"100%"} colorMode="light" radius={14}>
            {recipes[5] && (
              <Pressable
                onPress={() => router.push(`${recipes[5].id}`)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![5].title}
                </Text>
                <Image
                  source={{ uri: recipes![5].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
        </View>
      </View>
      <View style={{ flexDirection: "row-reverse", gap: 8 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton
            show={isLoading}
            height={150}
            width={"100%"}
            colorMode="light"
            radius={14}
          >
            {recipes[6] && (
              <Pressable
                onPress={() => router.push(`${recipes[6].id}`)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![6].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![0].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[7] && (
              <Pressable
                onPress={() => router.push(`${recipes[7].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![7].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![1].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[8] && (
              <Pressable
                onPress={() => router.push(`${recipes[8].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![8].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![2].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
        </View>
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[9] && (
              <Pressable
                onPress={() => router.push(`${recipes[9].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![9].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![3].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          {/* {!reverse && (
            <View
              style={{
                backgroundColor: "lightgray",
                height: 40,
                borderRadius: 12,
              }}
            ></View>
          )} */}
          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[10] && (
              <Pressable
                onPress={() => router.push(`${recipes[10].id}`)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![10].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![4].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
          <Skeleton height={150} width={"100%"} colorMode="light" radius={14}>
            {recipes[11] && (
              <Pressable
                onPress={() => router.push(`${recipes[11].id}`)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[0].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![5].title}
                </Text>
                <Image
                  source={{ uri: recipes![11].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>
        </View>
      </View>
    </View>
  );
}

export function RecipeItem({ recipe }: { recipe: any }) {
  const { image, title, id, aggregateLikes } = recipe;
  return (
    <Pressable
      onPress={() => router.push(`/${id}`)}
      style={{
        // height: 150,
        flex: 1,
      }}
    >
      <View
        style={{
          borderRadius: 12,
          overflow: "hidden",
          borderWidth: 1,
          flex: 1,
          borderColor: "orange",
          position: "relative",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            flex: 1,
            width: "100%",
            // height: 150,
            objectFit: "cover",
            aspectRatio: 1,
          }}
          resizeMode="center"
        />
        <View style={styles.heart}>
          <Text
            style={{ color: "white", fontWeight: "500" }}
          >{`${aggregateLikes}`}</Text>
          <Ionicons name="heart" size={14} color={"white"} />
        </View>
      </View>
      <View style={{ marginTop: 4 }}>
        <Text numberOfLines={1} style={{ fontSize: 11, fontWeight: "600" }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  customAll: {
    borderWidth: 0,
    borderColor: "lightgray",
    elevation: 6,
    position: "relative",
    backgroundColor: "gray",
    borderRadius: 12,
    overflow: "hidden",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  recipeTitle: {
    position: "absolute",
    bottom: 8,
    left: 0,
    width: "100%",
    paddingHorizontal: 8,
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    zIndex: 2,
  },
  heart: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "orange",
    padding: 2,
    borderRadius: 100,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
});
