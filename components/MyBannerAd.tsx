import React from "react";
import {
  BannerAd,
  BannerAdSize,
  RewardedAd,
  TestIds,
} from "react-native-google-mobile-ads";

export default function MyBannerAd() {
  return (
    <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.FULL_BANNER}
      onAdFailedToLoad={(error) => {
        console.log(`Banner Ad failed to load! ${error}`);
      }}
    />
  );
}
