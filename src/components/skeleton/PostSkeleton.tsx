import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "react-native";

type Props = React.ComponentProps<typeof Skeleton>;

function PostSkeleton(props: Props) {
  const colorScheme = useColorScheme();
  const colorMode = colorScheme === "dark" ? "dark" : "light";

  return <Skeleton colorMode={colorMode} {...props} />;
}

export default PostSkeleton;
