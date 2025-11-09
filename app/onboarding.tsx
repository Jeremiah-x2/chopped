import { HAS_SEEN_ONBOARDING_KEY, POINTS_KEY } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppOnboarding from "react-native-onboarding-swiper";

const { width, height } = Dimensions.get("window");

export default function OnBoarding() {
  const router = useRouter();
  const handleOnboardingDone = async () => {
    try {
      await AsyncStorage.setItem(HAS_SEEN_ONBOARDING_KEY, "true");
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error setting onboarding flag:", error);
    }
  };
  useEffect(() => {
    (async () => {
      console.log("fsdkgfdsjkhf");
      await AsyncStorage.setItem(POINTS_KEY, "25");
      const x = await AsyncStorage.getItem(POINTS_KEY);
      console.log("Points", x);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppOnboarding
          containerStyles={{}}
          pages={[
            {
              image: (
                <View
                  style={{
                    width,
                    height: height * 0.5,
                    // borderWidth: 2,
                    borderColor: "red",
                  }}
                >
                  <Image
                    source={slides[0].image}
                    style={{ flex: 1, width: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              ),
              title: slides[0].title,
              subtitle: slides[0].description,
              backgroundColor: "orange",
            },
            {
              image: (
                <View
                  style={{
                    width,
                    height: height * 0.5,
                    // borderWidth: 2,
                    borderColor: "red",
                  }}
                >
                  <Image
                    source={slides[1].image}
                    style={{ flex: 1, width: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              ),
              title: slides[1].title,
              subtitle: slides[1].description,
              backgroundColor: "orange",
            },
            {
              image: (
                <View
                  style={{
                    width,
                    height: height * 0.5,
                    // borderWidth: 2,
                    borderColor: "red",
                  }}
                >
                  <Image
                    source={slides[2].image}
                    style={{ flex: 1, width: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              ),
              title: slides[2].title,
              subtitle: slides[2].description,
              backgroundColor: "orange",
            },
          ]}
          onDone={handleOnboardingDone}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // borderWidth: 8,
    borderColor: "blue",
  },
});

interface ISliderItem {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const SliderItem = ({ item }: { item: ISliderItem }) => {
  return (
    <View
      style={{
        alignItems: "center",
        height: "100%",
        flex: 1,
      }}
    >
      <Image
        source={item.image}
        style={{ flex: 1, width }}
        resizeMode="contain"
      />

      <View style={{ gap: 16 }}>
        <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 24 }}>
          {item.title}
        </Text>
        <Text style={{ textAlign: "center" }}>{item.description}</Text>
      </View>
    </View>
  );
};

const slides: ISliderItem[] = [
  {
    id: "1",
    title: "Welcome to the App",
    description: "This is a brief introduction to the app.",
    image: require("@/assets/images/chef1.png"),
  },
  {
    id: "2",
    title: "Features",
    description: "Here are some features of the app.",
    image: require("@/assets/images/chef2.png"),
  },
  {
    id: "3",
    title: "Get Started",
    description: "Let's get started with using the app.",
    image: require("@/assets/images/chef3.png"),
  },
];
