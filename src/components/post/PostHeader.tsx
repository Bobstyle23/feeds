import { Author } from "@/entities/Author";
import { Comment } from "@/entities/Comment";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";

type AuthorInfo = Pick<Author, "avatarUrl" | "displayName">;
type CommentInfo = Pick<Comment, "text" | "createdAt">;

interface Props {
  author: AuthorInfo;
  comment?: CommentInfo;
  style?: ViewStyle;
}

function PostHeader({ author, comment, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: author.avatarUrl }} style={styles.avatar} />
      {comment ? (
        <View style={styles.textContainer}>
          <Text style={styles.author}>{author.displayName}</Text>
          <Text style={styles.comment}>{comment?.text}</Text>
        </View>
      ) : (
        <Text style={styles.author}>{author.displayName}</Text>
      )}
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

export default PostHeader;
