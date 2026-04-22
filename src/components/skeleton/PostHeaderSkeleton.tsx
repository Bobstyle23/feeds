import { spacing } from "@/theme/spacing";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import PostSkeleton from "./PostSkeleton";

function PostHeaderSkeleton() {
  return (
    <View style={styles.container}>
      <PostSkeleton width={40} height={40} radius="round" />
      <PostSkeleton width={120} height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: spacing[16],
    paddingBlock: spacing[12],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
  },
});

export default memo(PostHeaderSkeleton);
