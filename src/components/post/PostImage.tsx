import { fonts } from "@/theme/typography";
import { View, Image, StyleSheet, Text } from "react-native";
import PaidIcon from "@/assets/images/paid-icon.svg";
import { Button } from "../ui/Button";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { usePost } from "@/hooks/usePost";

import { BlurView } from "expo-blur";

interface Props {
  postId: string;
}

function PostImage({ postId }: Props) {
  const { data: post } = usePost(postId);

  if (!post) return;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: post.coverUrl }}
        style={styles.image}
        blurRadius={post.tier == "paid" ? 40 : 0}
      />

      {post.tier == "paid" && (
        <>
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          />

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

  content: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[24],
  },

  text: {
    color: colors.white,
    textAlign: "center",
    marginBlockStart: spacing[8],
    marginBlockEnd: spacing[13],
    fontSize: fontSize.sm2,
    fontFamily: fonts.semiBold,
    lineHeight: lineHeight.sm,
  },

  button: {
    width: 239,
    height: 42,
  },

  buttonText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.lg,
  },
});

export default PostImage;
