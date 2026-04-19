import { View, Text, StyleSheet } from "react-native";
import LikeIcon from "@/assets/images/like-icon.svg";
import CommentIcon from "@/assets/images/comment-icon.svg";
import { fonts } from "@/theme/typography";

interface Props {
  likes: number;
  comments: number;
}

function PostFooter({ likes, comments }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <LikeIcon width={24} height={24} />
        <Text style={styles.text}>{likes}</Text>
      </View>
      <View style={styles.subContainer}>
        <CommentIcon width={24} height={24} />
        <Text style={styles.text}>{comments}</Text>
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
    backgroundColor: "#EFF2F7",
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
