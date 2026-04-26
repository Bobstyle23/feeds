import { spacing } from "@/theme/spacing";
import { StyleSheet, View } from "react-native";
import PostSkeleton from "./PostSkeleton";
import { memo } from "react";

function PostCommentSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <PostSkeleton width={110} height={20} />
        <PostSkeleton width={110} height={20} />
      </View>
      <View style={styles.commentContainer}>
        <PostSkeleton width={40} height={40} radius={"round"} />
        <View style={{ gap: spacing[4] }}>
          <PostSkeleton width={140} height={20} />
          <PostSkeleton width={220} height={20} />
        </View>
        <View style={{ marginLeft: "auto" }}>
          <PostSkeleton width={80} height={40} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBlockEnd: spacing[16],
    gap: spacing[8],
    flex: 1,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
  },
});

export default memo(PostCommentSkeleton);
