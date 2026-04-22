import { spacing } from "@/theme/spacing";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

function PostFooterSkeleton() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <View style={styles.container}>
      <Skeleton colorMode={colorMode} width={64} height={36} radius={22} />
      <Skeleton colorMode={colorMode} width={64} height={36} radius={22} />
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
