import { spacing } from "@/theme/spacing";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import PostSkeleton from "./PostSkeleton";

function PostFooterSkeleton() {
  return (
    <View style={styles.container}>
      <PostSkeleton width={64} height={36} radius={22} />
      <PostSkeleton width={64} height={36} radius={22} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    marginInlineStart: spacing[16],
    marginBlockEnd: spacing[32],
  },
});

export default memo(PostFooterSkeleton);
