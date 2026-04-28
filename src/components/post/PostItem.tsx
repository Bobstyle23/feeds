import { Pressable, View } from "react-native";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import { colors } from "@/theme/colors";
import PostFooter from "./PostFooter";
import { spacing } from "@/theme/spacing";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { getComments } from "@/api/endpoints/comments";
import { usePost } from "@/hooks/usePost";
import { EmptyState } from "../states/EmptyState";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface Props {
  postId: string;
}

function PostItem({ postId }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: post } = usePost(postId);

  if (!post) return <EmptyState />;

  const translateX = useSharedValue(0);

  const shake = () => {
    translateX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handlePress = () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam = null }) =>
        getComments(post.id, { cursor: pageParam }),
    });

    if (post.tier === "paid") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      shake();
      return;
    }

    router.push(`/post/${post.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <View
          style={{ backgroundColor: colors.white, marginBlockEnd: spacing[16] }}
        >
          <PostHeader postId={post.id} />
          <PostImage postId={post.id} />
          <PostContent postId={post.id} />
          {post.tier !== "paid" ? <PostFooter postId={post.id} /> : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default PostItem;
