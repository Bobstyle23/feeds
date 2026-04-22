import { spacing } from "@/theme/spacing";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

function PostHeaderSkeleton() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";
  return (
    <View style={styles.container}>
      <Skeleton colorMode={colorMode} width={40} height={40} radius="round" />
      <Skeleton colorMode={colorMode} width={120} height={20} />
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
