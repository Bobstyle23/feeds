import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "react-native";

type Props = React.ComponentProps<typeof Skeleton>;

function PostSkeleton(props: Props) {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <Skeleton
      colors={["#E5E7EB", "#F3F4F6", "#E5E7EB"]}
      colorMode={colorMode}
      {...props}
    />
  );
}

export default PostSkeleton;
