import { fonts } from "@/theme/typography";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import PaidIcon from "@/assets/images/paid-icon.svg";
import { Button } from "../ui/Button";
import { colors } from "@/theme/colors";
interface Props {
  imageUrl: string;
  tier: string;
}

function PostImage({ imageUrl, tier }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        blurRadius={tier == "paid" ? 40 : 0}
      />

      {tier == "paid" && (
        <>
          <View style={styles.overlay} />

          <View style={styles.content}>
            <PaidIcon width={42} height={42} />
            <Text style={styles.text}>
              Контент скрыт пользователем.{"\n"}
              Доступ откроется после доната
            </Text>

            <Button
              title="Отправить донат"
              onPress={() => {}}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: 393,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  content: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  text: {
    color: colors.white,
    textAlign: "center",
    marginBlockStart: 8,
    marginBlockEnd: 13,
    fontSize: 15,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },

  button: {
    width: 239,
    height: 42,
  },

  buttonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 26,
  },
});

export default PostImage;
