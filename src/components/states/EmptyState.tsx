import { StyleSheet, View, Text } from "react-native";
import { Button } from "../ui/Button";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import ErrorSvg from "@/assets/images/illustration_sticker.svg";
import { fonts } from "@/theme/typography";
import { router } from "expo-router";

export const EmptyState = () => {
  return (
    <View style={styles.container}>
      <ErrorSvg width={112} height={112} />
      <Text style={styles.text}>По вашему запросу ничего не найдено</Text>
      <Button
        title="На главную"
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={() => router.back()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginInline: spacing[16],
    gap: spacing[16],
  },
  text: {
    fontSize: fontSize.lg,
    fontFamily: fonts.bold,
    lineHeight: lineHeight.lg,
  },

  button: {
    width: "100%",
    height: 42,
  },
  buttonText: {
    fontSize: fontSize.sm2,
    fontFamily: fonts.semiBold,
    lineHeight: lineHeight.lg,
  },
});
