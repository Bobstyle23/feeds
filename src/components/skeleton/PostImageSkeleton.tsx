import { Skeleton } from "moti/skeleton";
import { memo } from "react";
import { useColorScheme, View } from "react-native";
import PostSkeleton from "./PostSkeleton";

function PostImageSkeleton() {
  return (
    <View>
      <PostSkeleton width="100%" height={393} />
    </View>
  );
}

export default memo(PostImageSkeleton);
