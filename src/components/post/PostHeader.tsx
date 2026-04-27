import { usePost } from "@/hooks/usePost";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  postId: string;
}

function PostHeader({ postId }: Props) {
  const { data: post } = usePost(postId);

  if (!post) return;

  return (
    <View style={styles.container}>
      <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
      <Text style={styles.author}>{post.author.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: spacing[16],
    paddingBlock: spacing[12],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
    backgroundColor: colors.white,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  author: {
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
    fontFamily: fonts.bold,
  },
});

export default PostHeader;
