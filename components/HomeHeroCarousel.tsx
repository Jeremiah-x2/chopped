import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { router } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import ErrorComponent from "./ErrorComponent";

const { width: PAGE_WIDTH, height } = Dimensions.get("window");

export default function HomeHeroCarousel() {
  const progress = useSharedValue<number>(0);
  const router = useRouter();

  const { isLoading, results: recipes } = usePaginatedQuery(
    api.recipes.getRecipesBySearchQuery,
    {},
    { initialNumItems: 12 }
  );

  if (!isLoading && !recipes) return <ErrorComponent />;

  return (
    <View>
      <View style={{}}>
        <Carousel
          data={isLoading ? new Array(3).fill(null) : recipes!}
          width={PAGE_WIDTH < 600 ? PAGE_WIDTH : 600}
          height={PAGE_WIDTH < 600 ? PAGE_WIDTH / 2 : 300}
          renderItem={({ item, index }) =>
            isLoading ? (
              <Skeleton
                height={PAGE_WIDTH / 2}
                width={"100%"}
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
          data={isLoading ? new Array(3).fill(null) : recipes!}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          size={6}
          activeDotStyle={{ backgroundColor: "orange" }}
          containerStyle={{ gap: 5, marginTop: 10 }}
        />
      </View>
    </View>
  );
}

function SliderItem({ recipe }: { recipe: any }) {
  const { image, title, id } = recipe;
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/${id}`)}
      style={[
        {
          width: PAGE_WIDTH,
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
