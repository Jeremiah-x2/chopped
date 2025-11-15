import { UserPointsContext } from "@/app/_layout";
import useCustomFetchReactQuery from "@/hooks/useCustomFetchReactQuery";
import { Ionicons } from "@expo/vector-icons";
import { QueryObserverResult } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { useContext, useImperativeHandle } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type HomeRecipesProps = { children?: React.ReactNode };

export type HomeRecipesRef = {
  refetch: () => Promise<QueryObserverResult<unknown, Error>>;
};

const HomeRecipes = React.forwardRef((_props, ref) => {
  const router = useRouter();
  const { points, setPoints } = useContext(UserPointsContext);

  const { isLoading, error, data, refetch } = useCustomFetchReactQuery({
    customKey: "home-recipes",
    query: { number: "12", addRecipeInformation: "true" },
  });

  useImperativeHandle(ref, () => ({ refetch }), []);
  let recipes: any;

  if (data) {
    recipes = (data as any).data.recipes;
  }

  const handleToDetails = (index: number) => {
    const requiredPoints = 2;
    if (points < requiredPoints) {
      Alert.alert(
        "Insufficient Points!",
        "View ad by clicking on the points in the Home Screen to gain points."
      );
      return;
    } else {
      router.push(`/${recipes[index].id}`);
      setPoints((prev) => prev - requiredPoints);
    }
  };

  console.log("Recipes Result from Home Recipes Component", data);

  if (isLoading) return <ActivityIndicator />;
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
                onPress={() => handleToDetails(0)}
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
                onPress={() => handleToDetails(1)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[1].aggregateLikes}`}</Text>
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
                onPress={() => handleToDetails(2)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[2].aggregateLikes}`}</Text>
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
                onPress={() => handleToDetails(3)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[3].aggregateLikes}`}</Text>
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
                onPress={() => handleToDetails(4)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[4].aggregateLikes}`}</Text>
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
                onPress={() => handleToDetails(5)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[5].aggregateLikes}`}</Text>
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
                onPress={() => handleToDetails(6)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[6].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![6].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![6].title}
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
                onPress={() => handleToDetails(7)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[7].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![7].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![7].title}
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
                onPress={() => handleToDetails(8)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[8].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![8].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![8].title}
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
                onPress={() => handleToDetails(9)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[9].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![9].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![9].title}
                </Text>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.linearGradient}
                />
              </Pressable>
            )}
          </Skeleton>

          <Skeleton height={200} width={"100%"} colorMode="light" radius={14}>
            {recipes[10] && (
              <Pressable
                onPress={() => handleToDetails(10)}
                style={[{ height: 200 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[10].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Image
                  source={{ uri: recipes![10].image }}
                  style={{ flex: 1, width: "100%" }}
                />
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![10].title}
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
                onPress={() => handleToDetails(11)}
                style={[{ height: 150 }, styles.customAll]}
              >
                <View style={styles.heart}>
                  <Text
                    style={{ color: "white", fontWeight: "500" }}
                  >{`${recipes[11].aggregateLikes}`}</Text>
                  <Ionicons name="heart" size={14} color={"white"} />
                </View>
                <Text numberOfLines={2} style={styles.recipeTitle}>
                  {recipes![11].title}
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
});

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

export default HomeRecipes;
