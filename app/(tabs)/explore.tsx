import { RecipeItem } from "@/components/HomeRecipes";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { Skeleton } from "moti/skeleton";
import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Explore() {
  const {
    results: recipes,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.recipes.getRecipesPaginated,
    {},
    { initialNumItems: 12 }
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <RecipeItem recipe={item} />,
    []
  );
  const renderFooterLoader = () => {
    return status === "LoadingMore" ? (
      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <ActivityIndicator color={"orange"} size={"large"} />
      </View>
    ) : null;
  };

  if (status === "LoadingFirstPage")
    return (
      <View
        style={{
          justifyContent: "center",
          marginHorizontal: "auto",
          maxWidth: 600,
        }}
      >
        <FlatList
          data={new Array(8).fill(null)}
          ListHeaderComponentStyle={{ marginBottom: 24, marginTop: 12 }}
          stickyHeaderHiddenOnScroll={true}
          numColumns={2}
          style={{ maxWidth: 600, minWidth: "100%" }}
          contentContainerStyle={{
            paddingBottom: 120,
            maxWidth: 600,
          }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            gap: 12,
            paddingHorizontal: 16,
          }}
          ListHeaderComponent={() => (
            <View
              style={{
                position: "sticky",
                paddingHorizontal: 16,
                top: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{ fontWeight: "600", fontSize: 20, alignSelf: "center" }}
              >
                Recipes
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ width: 10, height: 16 }}></View>
          )}
          renderItem={() => (
            <View style={{ flex: 1, gap: 4 }}>
              <Skeleton height={200} width={"100%"} colorMode="light" />
              <Skeleton
                height={10}
                width={"100%"}
                colorMode="light"
                radius={2}
              />
              <Skeleton
                height={10}
                width={"50%"}
                colorMode="light"
                radius={2}
              />
            </View>
          )}
        />
      </View>
    );

  return (
    <View
      style={{
        justifyContent: "center",
        marginHorizontal: "auto",
        maxWidth: 600,
      }}
    >
      <FlatList
        data={recipes ? recipes : new Array(8).fill(null)}
        ListHeaderComponentStyle={{ marginBottom: 24, marginTop: 12 }}
        stickyHeaderHiddenOnScroll={true}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
          maxWidth: 600,
          minWidth: "100%",
          // marginHorizontal: "auto",
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 12,
          paddingHorizontal: 16,
        }}
        ListHeaderComponent={() => (
          <View
            style={{
              position: "sticky",
              paddingHorizontal: 16,
              top: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{ fontWeight: "600", fontSize: 20, alignSelf: "center" }}
            >
              Recipes
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: 10, height: 16 }}></View>
        )}
        renderItem={
          recipes
            ? renderItem
            : () => (
                <View style={{ flex: 1, gap: 4 }}>
                  <Skeleton height={200} width={"100%"} colorMode="light" />
                  <Skeleton
                    height={10}
                    width={"100%"}
                    colorMode="light"
                    radius={2}
                  />
                  <Skeleton
                    height={10}
                    width={"50%"}
                    colorMode="light"
                    radius={2}
                  />
                </View>
              )
        }
        keyExtractor={(item, index) => (recipes ? item._id : index.toString())}
        onEndReached={() => {
          console.log("End Reached");
          loadMore(12);
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooterLoader}
      />
    </View>
  );
}
