import React, { useEffect } from "react";
import { QueryProvider, queryClient } from "@/providers/QueryProvider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { SocketStore } from "@/stores/socketStore";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [loaded] = useFonts({
    ManropeBold: require("../../assets/fonts/Manrope-Bold.otf"),
    ManropeExtraBold: require("../../assets/fonts/Manrope-ExtraBold.otf"),
    ManropeMedium: require("../../assets/fonts/Manrope-Medium.otf"),
    ManropeRegular: require("../../assets/fonts/Manrope-Regular.otf"),
    ManropeSemiBold: require("../../assets/fonts/Manrope-SemiBold.otf"),
  });

  const socketStore = new SocketStore(queryClient);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    socketStore.connect();

    return () => socketStore.disconnect();
  }, []);

  if (!loaded) return null;

  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryProvider>
  );
}
