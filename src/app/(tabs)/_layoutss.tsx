// app/(tabs)/_layout.tsx
// import { Tabs } from "expo-router";
//
// export default function TabsLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="index" options={{ title: "Feed" }} />
//       <Tabs.Screen name="profile" options={{ title: "Profile" }} />
//     </Tabs>
//   );
// }
//
// app/(tabs)/_layout.tsx

import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "@/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

const { Navigator } = createMaterialTopTabNavigator();

// 👇 this connects Expo Router with React Navigation
export const TopTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.white }}
    >
      <TopTabs
        screenOptions={{
          tabBarScrollEnabled: true, // 👈 if many tabs
          tabBarIndicatorStyle: {
            backgroundColor: "#3b82f6",
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: colors.white,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
            backgroundColor: colors.white,
            elevation: 0,
          },
        }}
      >
        <TopTabs.Screen name="index" options={{ title: "Feed" }} />
        <TopTabs.Screen name="trending" options={{ title: "Trending" }} />
      </TopTabs>
    </SafeAreaView>
  );
}
