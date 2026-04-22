import { colors } from "@/theme/colors";
import { fontSize, lineHeight } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  LayoutChangeEvent,
} from "react-native";

const TABS = [
  { tabName: "Все", value: "all" },
  { tabName: "Бесплатные", value: "free" },
  { tabName: "Платные", value: "paid" },
];

type Tabs = "all" | "free" | "paid";

type Props = {
  value: Tabs;
  onChange: (val: Tabs) => void;
};

export default function SegmentedTabs({ value, onChange }: Props) {
  const translateX = useRef(new Animated.Value(0)).current;
  const tabWidth = useRef(0);

  const activeIndex = TABS.findIndex((t) => t.value === value);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth.current,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [activeIndex]);

  const onLayout = (e: LayoutChangeEvent) => {
    tabWidth.current = e.nativeEvent.layout.width / TABS.length;
    translateX.setValue(activeIndex * tabWidth.current);
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.activeIndicator,
          {
            width: `${100 / TABS.length}%`,
            transform: [{ translateX }],
          },
        ]}
      />

      {TABS.map((tab) => {
        const isActive = tab.value === value;

        return (
          <Pressable
            key={tab.value}
            style={styles.tab}
            onPress={() => onChange(tab.value)}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>
              {tab.tabName}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 999,
    margin: 16,
    position: "relative",
    height: 38,
    borderColor: colors.tabBorder,
    borderWidth: 1,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  text: {
    color: colors.tabName,
    fontFamily: fonts.medium,
    fontSize: fontSize.xs2,
    lineHeight: lineHeight.xs2,
  },

  activeText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fontSize.xs2,
    lineHeight: lineHeight.xs2,
  },

  activeIndicator: {
    position: "absolute",
    inset: 0,
    backgroundColor: colors.primaryDeep,
    borderRadius: 999,
  },
});
