import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LikeIcon from "@/assets/images/like-icon.svg";
import LikeIconFull from "@/assets/images/like-icon-full.svg";
import CommentIcon from "@/assets/images/comment-icon.svg";
import { fonts } from "@/theme/typography";
import { useToggleLike } from "@/hooks/useLike";
import { Post } from "@/entities/Post";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";

type PostInfo = Pick<Post, "id" | "likesCount" | "commentsCount" | "isLiked">;

interface Props {
  post: PostInfo;
}

function PostFooter({ post }: Props) {
  const { mutate } = useToggleLike();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => mutate(post.id)}>
        <View
          style={{
            backgroundColor: post.isLiked ? colors.accent : colors.uiBase,
            ...styles.subContainer,
          }}
        >
          {post.isLiked ? (
            <LikeIconFull width={24} height={24} />
          ) : (
            <LikeIcon width={24} height={24} />
          )}

          <Text
            style={{
              color: post.isLiked ? colors.accentLight : "",
              ...styles.text,
            }}
          >
            {post.likesCount}
          </Text>
        </View>
      </TouchableOpacity>

      <View
        style={{
          ...styles.subContainer,
          backgroundColor: colors.uiBase,
        }}
      >
        <CommentIcon width={24} height={24} />
        <Text style={styles.text}>{post.commentsCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing[8],
    paddingInlineStart: spacing[16],
    paddingBlockEnd: spacing[12],
  },
  subContainer: {
    width: 63,
    height: 36,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[4],
    paddingInlineStart: spacing[6],
    paddingInlineEnd: spacing[12],
    paddingBlock: spacing[6],
  },
  text: {
    fontSize: fontSize.xs2,
    lineHeight: lineHeight.lg,
    fontFamily: fonts.bold,
  },
});

export default PostFooter;
