import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import ScrollProvider from "@/providers/ScrollProvider";
import { HAS_SEEN_ONBOARDING_KEY, POINTS_KEY } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack, useRouter } from "expo-router";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";

mobileAds()
  .setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
    testDeviceIdentifiers: ["EMULATOR", "015eaa74-710c-4cfd-b41b-b802367285ea"],
  })
  .then(() => mobileAds().initialize());
// .initialize()
// .then((adapterStatus) => {
//   console.log("Google Ads Adapter Status", adapterStatus);
// })
// .catch((error) => {
//   console.log("Google Ads Adapter error", error);
// });

const convex = new ConvexReactClient(
  "https://sensible-mosquito-643.convex.cloud"
);

export interface IPoints {
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
}
export const UserPointsContext = createContext<IPoints>({
  points: 0,
  setPoints: () => {},
});
export default function RootLayout() {
  const router = useRouter();
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const pointStore = await AsyncStorage.getItem(POINTS_KEY);
      console.log("Hello useEffect!");
      console.log("Point Store Front", pointStore);
      if (pointStore) {
        console.log("PointStore from Layout", pointStore);
        setPoints(Number(pointStore));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(POINTS_KEY, points.toString());
    })();
  }, [points]);

  useEffect(() => {
    (async () => {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          HAS_SEEN_ONBOARDING_KEY
        );
        if (!hasSeenOnboarding || hasSeenOnboarding === "false") {
          router.replace("/onboarding");
        } else {
          router.replace("/(tabs)/home");
        }
      } catch (error) {}
    })();
  }, []);

  console.log("All Points", points);
  return (
    <UserPointsContext.Provider value={{ points, setPoints }}>
      <ReactQueryClientProvider>
        <ConvexProvider client={convex}>
          <ScrollProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </ScrollProvider>
        </ConvexProvider>
      </ReactQueryClientProvider>
    </UserPointsContext.Provider>
  );
}
