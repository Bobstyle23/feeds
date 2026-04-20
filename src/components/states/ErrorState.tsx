import { StyleSheet, View, Text } from "react-native";
import { Button } from "../ui/Button";
import ErrorSvg from "@/assets/images/illustration_sticker.svg";
import { fonts } from "@/theme/typography";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.container}>
    <ErrorSvg width={112} height={112} />
    <Text style={styles.text}>Не удалось загрузить публикации</Text>
    <Button
      title="Повторить"
      onPress={onRetry}
      style={styles.button}
      textStyle={styles.buttonText}
    />
  </View>
);

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
