import { fonts } from "@/theme/typography";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import PaidIcon from "@/assets/images/paid-icon.svg";
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

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Отправить донат</Text>
            </TouchableOpacity>
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  icon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#6C2BD9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  text: {
    color: "#fff",
    textAlign: "center",
    marginBlockStart: 8,
    marginBlockEnd: 13,
    fontSize: 15,
    fontFamily: fonts.semiBold,
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#6C2BD9",
    borderRadius: 14,
    width: 239,
    height: 42,
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontFamily: fonts.semiBold,
    fontSize: 15,
    lineHeight: 26,
    textAlign: "center",
  },
});

export default PostImage;
