import { spacing } from "@/theme/spacing";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

function PostContentSkeleton() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <View style={styles.container}>
      <Skeleton colorMode={colorMode} width={164} height={26} />
      <Skeleton colorMode={colorMode} width="100%" height={20} />
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
