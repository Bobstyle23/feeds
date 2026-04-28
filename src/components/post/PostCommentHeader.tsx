import { Comment } from "@/entities/Comment";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import { StyleSheet, View, Image, Text } from "react-native";

interface Props {
  comment: Comment;
}

function PostCommentHeader({ comment }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.author.avatarUrl }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.author}>{comment.author.displayName}</Text>
        <Text style={styles.comment}>{comment.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBlock: spacing[8],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
    backgroundColor: colors.white,
  },

  textContainer: {
    justifyContent: "center",
    gap: spacing[4],
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
  comment: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
});

export default PostCommentHeader;
