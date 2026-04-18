import React from "react";
import { View, Text, SafeAreaViewBase } from "react-native";
import HomeScreen from ".";

export default function TabLayout() {
  return (
    <SafeAreaViewBase>
      <View>
        <Text>TabLayout</Text>
      </View>
      <View>
        <HomeScreen />
      </View>
    </SafeAreaViewBase>
  );
}
