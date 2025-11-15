import BottomSheet, { BottomSheetRefProps } from "@/components/BottomSheet";
// import { RecipeItem } from "@/components/HomeRecipes";
import useCustomFetchReactQuery from "@/hooks/useCustomFetchReactQuery";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useContext, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserPointsContext } from "./_layout";

export default function SearchQuery() {
  const searchParams = useLocalSearchParams();
  const router = useRouter();
  const ref = useRef<BottomSheetRefProps>(null);
  const searchRef = useRef<TextInput>(null);
  const [searchQueryValue, setSearchQueryValue] = useState<string>("");
  console.log(searchQueryValue);

  console.log(searchParams);

  const queries: Record<string, string> = { addRecipeInformation: "true" };
  if (searchParams.query) queries["query"] = searchParams.query as string;
  if (searchParams.cuisine) queries["cuisine"] = searchParams.cuisine as string;
  if (searchParams.mealTypes)
    queries["mealType"] = searchParams.mealTypes as string;

  const {
    isLoading,
    data: recipes,
    error,
    refetch,
  } = useCustomFetchReactQuery({
    baseUrl: `https://api.spoonacular.com/recipes/complexSearch`,
    query: {
      ...queries,
    },
    customKey: "recipe-search",
  });

  console.log("Query Recipes", recipes);

  const [cuisines, setCuisines] = useState<
    { isSelected: boolean; cuisine: string }[]
  >([
    { isSelected: false, cuisine: "African" },
    { isSelected: false, cuisine: "Asian" },
    { isSelected: false, cuisine: "American" },
    { isSelected: false, cuisine: "European" },
    { isSelected: false, cuisine: "French" },
    { isSelected: false, cuisine: "Indian" },
    { isSelected: false, cuisine: "Italian" },
    { isSelected: false, cuisine: "Thai" },
  ]);

  const [mealTypes, setMealTypes] = useState<
    { isSelected: boolean; mealType: string }[]
  >([
    { isSelected: false, mealType: "breakfast" },
    { isSelected: false, mealType: "dessert" },
    { isSelected: false, mealType: "drink" },
    { isSelected: false, mealType: "sauce" },
    { isSelected: false, mealType: "main course" },
    { isSelected: false, mealType: "appetizer" },
  ]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <RecipeItem recipe={item} />,
    []
  );

  const onPress = () => {
    const isActive = ref.current?.isActive();
    if (isActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(-400);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, []);

  const onSetFilters = () => {
    router.setParams({
      cuisine: cuisines
        .filter((item) => item.isSelected)
        .map((item) => item.cuisine)
        .join(","),
      mealTypes: mealTypes
        .filter((item) => item.isSelected)
        .map((item) => item.mealType)
        .join(","),
    });
    ref.current?.scrollTo(0);
    refetch();
  };

  const onClearFilters = () => {
    setCuisines((prev) => prev.map((item) => ({ ...item, isSelected: false })));
    setMealTypes((prev) =>
      prev.map((item) => ({ ...item, isSelected: false }))
    );
    router.setParams({ cuisine: "", mealTypes: "" });
    ref.current?.scrollTo(0);
    refetch();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, alignItems: "center" }}>
      <BottomSheet ref={ref}>
        <View style={{ flex: 1, gap: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 16,
            }}
          >
            <Pressable
              onPress={onClearFilters}
              style={{
                paddingHorizontal: 14,
                backgroundColor: "transparent",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "orange",
                paddingVertical: 6,
              }}
            >
              <Text style={{ color: "orange", fontWeight: "600" }}>
                Clear Filters
              </Text>
            </Pressable>
            <Pressable
              onPress={onSetFilters}
              style={{
                paddingHorizontal: 14,
                backgroundColor: "orange",
                borderRadius: 8,
                borderWidth: 2,
                borderColor: "orange",
                paddingVertical: 6,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Set Filters
              </Text>
              <Ionicons name="checkmark" color={"white"} />
            </Pressable>
          </View>
          <View
            style={{
              // flex: 1,
              // backgroundColor: "lightgray",
              paddingHorizontal: 16,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                alignSelf: "center",
                paddingHorizontal: 16,
                backgroundColor: "orange",
                paddingVertical: 8,
                color: "white",
                borderRadius: 12,
              }}
            >
              Cuisines
            </Text>
            <FlatList
              data={cuisines}
              numColumns={4}
              columnWrapperStyle={{
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index.toString()}
                  onPress={() =>
                    setCuisines((prev) =>
                      prev.map((item, i) =>
                        index === i
                          ? { ...item, isSelected: !item.isSelected }
                          : { ...item }
                      )
                    )
                  }
                  style={{
                    backgroundColor: item.isSelected ? "orange" : "#f1f1f1",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      color: item.isSelected ? "white" : "#222",
                    }}
                  >
                    {item.cuisine}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: "lightgray",
              paddingHorizontal: 16,
              gap: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                alignSelf: "center",
                paddingHorizontal: 16,
                backgroundColor: "orange",
                paddingVertical: 8,
                color: "white",
                borderRadius: 12,
              }}
            >
              Meal Type
            </Text>
            <FlatList
              data={mealTypes}
              numColumns={4}
              columnWrapperStyle={{
                gap: 8,
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index.toString()}
                  onPress={() =>
                    setMealTypes((prev) =>
                      prev.map((item, i) =>
                        index === i
                          ? { ...item, isSelected: !item.isSelected }
                          : { ...item }
                      )
                    )
                  }
                  style={{
                    backgroundColor: item.isSelected ? "orange" : "#f1f1f1",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 14,
                      color: item.isSelected ? "white" : "#222",
                    }}
                  >
                    {item.mealType.slice(0, 1).toUpperCase() +
                      item.mealType.slice(1)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </BottomSheet>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            paddingTop: 20,
            paddingBottom: 20,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              width: "100%",
            }}
          >
            <View style={{ position: "relative", flex: 1 }}>
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
                ref={searchRef}
                style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: 100,
                  height: 40,
                  paddingLeft: 28,
                  color: "#262626",
                }}
                onChangeText={(value) => setSearchQueryValue(value)}
                returnKeyType="done"
                onSubmitEditing={() => {
                  router.setParams({ query: searchQueryValue });
                  setSearchQueryValue("");
                  refetch();
                }}
              />
            </View>
            <Pressable
              onPress={onPress}
              style={{
                borderRadius: 8,
                paddingHorizontal: 12,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f1f1f1",
              }}
            >
              <Ionicons name="filter" size={24} color={"gray"} />
            </Pressable>
          </View>

          {isLoading && (
            <View style={{ alignItems: "center" }}>
              <ActivityIndicator />
            </View>
          )}
          <View>
            {recipes && (recipes as any).data.results && (
              <FlatList
                data={(recipes as any).data.results}
                numColumns={2}
                contentContainerStyle={{
                  marginTop: 24,
                  minWidth: "100%",
                  maxWidth: 600,
                  marginHorizontal: "auto",
                }}
                columnWrapperStyle={{ gap: 8 }}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 16 }}></View>
                )}
                renderItem={renderItem}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

export function RecipeItem({ recipe }: { recipe: any }) {
  const router = useRouter();
  const { points, setPoints } = useContext(UserPointsContext);
  const { image, title, id, aggregateLikes } = recipe;
  return (
    <Pressable
      onPress={() => {
        const requiredPoints = 2;
        if (points < requiredPoints) {
          Alert.alert(
            "Insufficient Points!",
            "View ad by clicking on the points in the Home Screen to gain points."
          );
          return;
        } else {
          router.push(`/search-unique/${id}`);
          setPoints((prev) => prev - requiredPoints);
        }
      }}
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
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
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
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
    zIndex: 6,
  },
  customAll: {
    borderWidth: 0,
    borderColor: "lightgray",
    elevation: 6,
    position: "relative",
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
