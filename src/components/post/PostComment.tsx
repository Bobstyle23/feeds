import { Comment } from "@/entities/Comment";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import LikeIcon from "@/assets/images/heart.svg";
import LikeIconFull from "@/assets/images/heart_solid.svg";
import { useState } from "react";
import { fonts } from "@/theme/typography";
import { colors } from "@/theme/colors";
import PostCommentHeader from "./PostCommentHeader";

interface Props {
  comment: Comment;
}

function PostComment({ comment }: Props) {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikedCount(liked ? likedCount - 1 : likedCount + 1);
  };

  return (
    <View style={styles.container}>
      <PostCommentHeader comment={comment} />
      <View style={styles.likeContainer}>
        <Pressable onPress={handleLike}>
          {!liked ? <LikeIcon /> : <LikeIconFull />}
        </Pressable>

        <Text style={styles.likeCount}>{likedCount}</Text>
      </View>
    </View>
  );
}

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
