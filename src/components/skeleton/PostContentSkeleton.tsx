import { spacing } from "@/theme/spacing";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import PostSkeleton from "./PostSkeleton";

function PostContentSkeleton() {
  return (
    <View style={styles.container}>
      <PostSkeleton width={164} height={26} />
      <PostSkeleton width="100%" height={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    gap: spacing[8],
    margin: spacing[16],
    marginBlockEnd: spacing[8],
  },
});

export default memo(PostContentSkeleton);
