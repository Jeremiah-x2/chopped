import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import HomeRecipes from "@/components/HomeRecipes";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";

import { GOOGLE_AD_ANDROID_UNIT_ID } from "@/utils/constants";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { IPoints, UserPointsContext } from "../_layout";

const { width: PAGE_WIDTH } = Dimensions.get("window");

export default function Home() {
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const router = useRouter();
  const rewardedAdRef = useRef<RewardedAd | null>(null);
  const { points, setPoints } = useContext<IPoints>(UserPointsContext);

  const mealCategories = [
    {
      category: "cuisine",
      items: [
        {
          image: require("@/assets/images/places/african.png"),
          cat_: "African",
        },
        {
          image: require("@/assets/images/places/american.png"),
          cat_: "American",
        },
        {
          image: require("@/assets/images/places/british.png"),
          cat_: "British",
        },
        { image: require("@/assets/images/places/irish.png"), cat_: "Irish" },
        {
          image: require("@/assets/images/places/japanese.png"),
          cat_: "Japanese",
        },
        { image: require("@/assets/images/places/korean.png"), cat_: "Korean" },
        {
          image: require("@/assets/images/places/nordic.png"),
          cat_: "Nordic",
        },
        {
          image: require("@/assets/images/places/german.png"),
          cat_: "German",
        },
      ],
    },
    {
      category: "mealTypes",
      items: [
        {
          image: require("@/assets/images/mealtypes/sauce.png"),
          cat_: "Sauce",
        },
        { image: require("@/assets/images/mealtypes/soup.png"), cat_: "Soup" },
        {
          image: require("@/assets/images/mealtypes/snack.png"),
          cat_: "Snack",
        },
        {
          image: require("@/assets/images/mealtypes/drink.png"),
          cat_: "Drink",
        },
        {
          image: require("@/assets/images/mealtypes/salad.png"),
          cat_: "Salad",
        },
        {
          image: require("@/assets/images/mealtypes/dessert.png"),
          cat_: "Dessert",
        },
        {
          image: require("@/assets/images/mealtypes/bread.png"),
          cat_: "Bread",
        },
        {
          image: require("@/assets/images/mealtypes/marinade.png"),
          cat_: "Marinade",
        },
      ],
    },
  ];

  useEffect(() => {
    rewardedAdRef.current = RewardedAd.createForAdRequest(
      GOOGLE_AD_ANDROID_UNIT_ID!
    );

    const unsubscribeLoaded = rewardedAdRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => console.log("Rewarded ad loaded")
    );
    const unsubscribeEarned = rewardedAdRef.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("Add Watched Successfully", reward.amount, reward.type);
        setPoints((prev) => prev + reward.amount);
        rewardedAdRef.current?.load();
      }
    );
    rewardedAdRef.current.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      rewardedAdRef.current?.removeAllListeners();
    };
  }, []);

  const showAd = async () => {
    if (rewardedAdRef.current?.loaded) {
      rewardedAdRef.current.show();
    } else {
      Alert.alert("Ad not ready", "Please try again in a few seconds.");
      rewardedAdRef.current?.load();
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "orange" }}>
              Chopped
            </Text>
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 50, height: 45 }}
            />
          </View>
          <Pressable
            onPress={showAd}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text style={{ fontWeight: "600" }}>{points} pts</Text>
            <FontAwesome5 name="coins" />
          </Pressable>
        </View>

        <View style={{ marginTop: 24 }}>
          <Carousel
            ref={carouselRef}
            width={PAGE_WIDTH < 600 ? PAGE_WIDTH : 600}
            height={PAGE_WIDTH < 600 ? PAGE_WIDTH / 2 : 200}
            data={mealCategories}
            onProgressChange={progress}
            loop={false}
            renderItem={({ index, item }) => (
              <FlatList
                data={item.items}
                // horizontal
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                contentContainerStyle={{
                  gap: 8,
                  rowGap: 8,
                  columnGap: 8,
                  paddingHorizontal: 8,
                }}
                renderItem={({ item: itemList, index }) => (
                  <Pressable
                    onPress={() => {
                      const pointsRequired = 3;
                      if (points < pointsRequired) {
                        Alert.alert(
                          "Insufficient Points!",
                          "View ad by clicking on the points at the Top Right Corner to gain points."
                        );
                      } else {
                        router.push({
                          pathname: "/searchQuery",
                          params: { [item.category]: itemList.cat_ },
                        });
                        setPoints((prev) => prev - pointsRequired);
                      }
                    }}
                    key={index}
                    style={{
                      borderWidth: 2,
                      borderColor: "transparent",
                      overflow: "hidden",
                      padding: 12,
                      backgroundColor: "#f7f7f7",
                      borderRadius: 12,
                      position: "relative",
                      width: 80,
                      height: 80,
                      zIndex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Image
                        source={itemList.image}
                        style={{
                          width: 50,
                          height: 50,
                          // position: "absolute",
                          // top: "-50%",
                          // right: "-50%",
                          zIndex: 4,
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: "600",
                          fontSize: 10,
                          textAlign: "center",
                        }}
                      >
                        {itemList.cat_}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            )}
          />

          <Pagination.Custom
            progress={progress}
            data={mealCategories}
            size={8}
            containerStyle={{ gap: 4 }}
            dotStyle={{
              borderRadius: 16,
              backgroundColor: "#f5f5f5",
            }}
            activeDotStyle={{
              borderRadius: 8,
              width: 16,
              overflow: "hidden",
              backgroundColor: "orange",
            }}
            horizontal
            customReanimatedStyle={(progress, index, length) => {
              let val = Math.abs(progress - index);
              if (index === 0 && progress > length - 1) {
                val = Math.abs(progress - length);
              }

              return {
                transform: [
                  {
                    translateY: interpolate(
                      val,
                      [0, 1],
                      [0, 0],
                      Extrapolation.CLAMP
                    ),
                  },
                ],
              };
            }}
          />
        </View>

        <View style={{ marginTop: 24, gap: 12 }}>
          <HomeHeroCarousel />
        </View>

        <View style={{ marginTop: 24, gap: 12 }}>
          <Text style={{ fontWeight: "700", paddingLeft: 16, fontSize: 20 }}>
            Recipes
          </Text>
          <View style={{ paddingHorizontal: 16, gap: 12 }}>
            <HomeRecipes />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    maxWidth: 600,
    marginHorizontal: "auto",
    // paddingHorizontal: 16,

    // paddingVertical: 20,
    paddingBottom: 100,
  },
});
