import { Pressable, View } from "react-native";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import { Post } from "@/entities/Post";
import { colors } from "@/theme/colors";
import PostFooter from "./PostFooter";
import { spacing } from "@/theme/spacing";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { getPostById } from "@/api/endpoints/posts";

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handlePress = () => {
    queryClient.prefetchQuery({
      queryKey: ["post", post.id],
      queryFn: () => getPostById(post.id),
    });

    router.push(`/post/${post.id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{ backgroundColor: colors.white, marginBlockEnd: spacing[16] }}
      >
        <PostHeader author={post.author} />
        <PostImage imageUrl={post.coverUrl} tier={post.tier} />
        <PostContent postId={post.id} />
        {post.tier !== "paid" ? <PostFooter post={post} /> : null}
      </View>
    </Pressable>
  );
}

export default PostItem;
