import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LikeIcon from "@/assets/images/like-icon.svg";
import LikeIconFull from "@/assets/images/like-icon-full.svg";
import CommentIcon from "@/assets/images/comment-icon.svg";
import { fonts } from "@/theme/typography";
import { useToggleLike } from "@/hooks/useLike";
import { Post } from "@/entities/Post";

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
            backgroundColor: post.isLiked ? "#FF2B75" : "#EFF2F7",
            ...styles.subContainer,
          }}
        >
          {post.isLiked ? (
            <LikeIconFull width={24} height={24} />
          ) : (
            <LikeIcon width={24} height={24} />
          )}

          <Text
            style={{ color: post.isLiked ? "#FFEAF1" : "", ...styles.text }}
          >
            {post.likesCount}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.subContainer}>
        <CommentIcon width={24} height={24} />
        <Text style={styles.text}>{post.commentsCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingInlineStart: 16,
    paddingBlockEnd: 12,
  },
  subContainer: {
    width: 63,
    height: 36,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingInlineStart: 6,
    paddingInlineEnd: 12,
    paddingBlock: 6,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: fonts.bold,
  },
});

export default PostFooter;
