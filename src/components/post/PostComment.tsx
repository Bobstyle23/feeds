import { Author } from "@/entities/Author";
import { Comment } from "@/entities/Comment";
import PostHeader from "./PostHeader";
import { spacing } from "@/theme/spacing";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  author: Author;
  comment: Comment;
}

function PostComment({ author, comment }: Props) {
  return (
    <View style={styles.container}>
      <PostHeader
        author={author}
        comment={comment}
        style={{
          paddingBlock: spacing[8],
          paddingInline: 0,
        }}
      />
      <Text>Like</Text>
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
});

export default PostComment;
