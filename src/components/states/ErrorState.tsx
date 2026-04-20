import { StyleSheet, View, Text } from "react-native";
import { Button } from "../ui/Button";
import ErrorSvg from "@/assets/images/illustration_sticker.svg";
import { fonts } from "@/theme/typography";

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
    marginInline: 16,
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.bold,
    lineHeight: 26,
  },

  button: {
    width: "100%",
    height: 42,
  },

  buttonText: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    lineHeight: 26,
  },
});
