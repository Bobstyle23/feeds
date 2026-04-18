import React, { useEffect } from "react";
import HomeScreen from ".";
import { QueryProvider } from "@/providers/QueryProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [loaded] = useFonts({
    ManropeBold: require("../../assets/fonts/Manrope-Bold.otf"),
    ManropeExtraBold: require("../../assets/fonts/Manrope-ExtraBold.otf"),
    ManropeMedium: require("../../assets/fonts/Manrope-Medium.otf"),
    ManropeRegular: require("../../assets/fonts/Manrope-Regular.otf"),
    ManropeSemiBold: require("../../assets/fonts/Manrope-SemiBold.otf"),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryProvider>
      <HomeScreen />
    </QueryProvider>
  );
}
