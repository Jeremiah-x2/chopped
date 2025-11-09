import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { usePaginatedQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");
export default function Search() {
  const router = useRouter();
  const progress = useSharedValue<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const { isLoading, results } = usePaginatedQuery(
    api.recipes.getRecipesCarouselSearch,
    {},
    { initialNumItems: 6 }
  );

  const cuisines: string[] = [
    "Asian",
    "Italian",
    "European",
    "French",
    "Thai",
    "Mexican",
    "American",
    "Indian",
  ];

  const showCase: ImageSourcePropType[] = [
    require("@/assets/images/places/asian.png"),
    require("@/assets/images/places/african.png"),
    require("@/assets/images/places/european.png"),
    require("@/assets/images/showmeal4.png"),
    require("@/assets/images/places/thai.png"),
    require("@/assets/images/showmeal6.png"),
    require("@/assets/images/showmeal7.png"),
    require("@/assets/images/showmeal8.png"),
  ];

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 4 : 0}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          // minWidth: "100%",
          // maxWidth: 600,
          marginHorizontal: "auto",
          // borderWidth: 2,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginBottom: 120,
            gap: 20,
            paddingTop: 20,
            minWidth: "100%",
            maxWidth: 600,
            marginHorizontal: "auto",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Search Recipes
            </Text>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "50%",
                  left: 8,
                  transform: [{ translateY: "-50%" }],
                }}
              >
                <Ionicons name="search" color={"orange"} size={16} />
              </View>
              <TextInput
                style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: 100,
                  height: 40,
                  paddingLeft: 28,
                  color: "#262626",
                }}
                onChangeText={(text) => setSearchValue(text)}
                returnKeyType="done"
                onSubmitEditing={() => {
                  router.push({
                    pathname: "/searchQuery",
                    params: { query: searchValue },
                  });
                }}
              />
            </View>
          </View>

          <View>
            <Carousel
              width={width < 600 ? width : 600}
              height={width < 600 ? width / 2 : 300}
              data={isLoading ? new Array(3).fill(null) : results}
              renderItem={({ item, index }) =>
                isLoading ? (
                  <Skeleton
                    height={width / 2}
                    width={width}
                    radius={16}
                    colorMode="light"
                  />
                ) : (
                  <SliderItem recipe={item} key={index.toString()} />
                )
              }
              onProgressChange={progress}
            />
            <Pagination.Basic
              progress={progress}
              data={isLoading ? new Array(3).fill(null) : results!}
              dotStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 50,
              }}
              size={6}
              activeDotStyle={{ backgroundColor: "orange" }}
              containerStyle={{ gap: 5, marginTop: 10 }}
            />
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            <Text style={{ fontWeight: "700", fontSize: 24, color: "#333" }}>
              Categories
            </Text>
            <FlatList
              data={cuisines}
              numColumns={2}
              contentContainerStyle={{ marginTop: 16 }}
              columnWrapperStyle={{ gap: 8 }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }}></View>}
              renderItem={({ index, item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/searchQuery",
                      params: { cuisine: item },
                    })
                  }
                  key={index}
                  style={{
                    backgroundColor: "orange",
                    height: 64,
                    borderRadius: 8,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: 12,
                  }}
                >
                  <ImageBackground
                    source={showCase[index]}
                    style={{ flex: 1, height: "100%" }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{ fontWeight: "600", fontSize: 18, color: "white" }}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SliderItem({ recipe }: { recipe: any }) {
  const router = useRouter();
  const { image, title, id } = recipe;
  return (
    <Pressable
      onPress={() => router.push(`/${id}`)}
      style={[
        {
          width: width,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          flex: 1,
        },
      ]}
    >
      <View
        style={{
          elevation: 4,
          flex: 1,
          width: "100%",
          overflow: "hidden",
          borderRadius: 20,
        }}
      >
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 200, borderRadius: 20, flex: 1 }}
          />
        </View>
        <View>
          <Text
            numberOfLines={2}
            style={{
              position: "absolute",
              bottom: 8,
              left: 0,
              width: "100%",
              paddingHorizontal: 16,
              color: "white",
              fontSize: 16,
              fontWeight: "700",
              zIndex: 10,
            }}
          >
            {title}
          </Text>
        </View>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.linearGradient}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
