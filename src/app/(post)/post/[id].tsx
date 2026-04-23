// app/post/[id].tsx
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePost } from "@/hooks/usePost";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import PostHeader from "@/components/post/PostHeader";
import PostImage from "@/components/post/PostImage";
import PostContent from "@/components/post/PostContent";
import PostFooter from "@/components/post/PostFooter";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = usePost(id as string);

  if (!post) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <PostHeader author={post.author} />
      <PostImage imageUrl={post.coverUrl} tier={post.tier} />
      <PostContent postId={post.id} />
      <PostFooter post={post} />
    </SafeAreaView>
  );
}
