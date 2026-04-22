import { DimensionValue, useColorScheme } from "react-native";
import { Skeleton } from "moti/skeleton";
import { memo } from "react";

export interface SkeletonTextProps {
  width: DimensionValue;
  height: number;
}

function SkeletonText({ width = "100%", height }: SkeletonTextProps) {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return <Skeleton colorMode={colorMode} width={width} height={height} />;
}

export default memo(SkeletonText);
