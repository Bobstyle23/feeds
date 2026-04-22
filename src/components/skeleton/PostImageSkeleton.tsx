import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { useColorScheme, View } from "react-native";

function PostImageSkeleton() {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <View>
      <Skeleton colorMode={colorMode} width="100%" height={393} />
    </View>
  );
}

export default memo(PostImageSkeleton);
