import { Comment } from "@/entities/Comment";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LikeIcon from "@/assets/images/heart.svg";
import LikeIconFull from "@/assets/images/heart_solid.svg";
import { fonts } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { observer } from "mobx-react-lite";
import PostCommentHeader from "./PostCommentHeader";
import { commentLikeStore } from "@/stores/commentLikeStore";

interface Props {
  comment: Comment;
}

const PostComment = observer(function PostComment({ comment }: Props) {
  const { isLiked, count } = commentLikeStore.getState(comment.id, 0);

  const handleLike = () => {
    commentLikeStore.toggle(comment.id, 0);
  };

  return (
    <View style={styles.container}>
      <PostCommentHeader comment={comment} />
      <View style={styles.likeContainer}>
        <Pressable onPress={handleLike}>
          {!isLiked ? <LikeIcon /> : <LikeIconFull />}
        </Pressable>

        <Text style={styles.likeCount}>{count}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[12],
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[6],
  },
  likeCount: {
    fontFamily: fonts.bold,
    fontSize: fontSize.xs2,
    lineHeight: lineHeight.xs2,
    color: colors.tabName,
  },
});

export default PostComment;
