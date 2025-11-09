import { Platform } from "react-native";

export const poppinsWeight = {
  bold: Platform.select({ ios: "Poppins-Bold", android: "Poppins_700Bold" }),
  semiBold: Platform.select({
    ios: "Poppins-SemiBold",
    android: "Poppins_600SemiBold",
  }),
  regular: Platform.select({
    ios: "Poppins-Regular",
    android: "Poppins_400Regular",
  }),
  medium: Platform.select({
    ios: "Poppins-Medium",
    android: "Poppins_500Medium",
  }),
};
