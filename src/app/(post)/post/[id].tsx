import { useLocalSearchParams } from "expo-router";
import { usePost } from "@/hooks/usePost";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import PostHeader from "@/components/post/PostHeader";
import PostImage from "@/components/post/PostImage";
import PostFooter from "@/components/post/PostFooter";
import ExpandableText from "@/components/common/ExpandableText";
import { EmptyState } from "@/components/states/EmptyState";
import PostComments from "@/components/post/PostComments";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = usePost(id as string);

  if (!post) return <EmptyState />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <PostHeader author={post.author} />
      <PostImage imageUrl={post.coverUrl} tier={post.tier} />
      <ExpandableText
        title={post.title}
        body={post.body}
        preview={post.preview}
        tier={post.tier}
        mode="full"
      />
      <PostFooter post={post} />
      <PostComments post={post} />
    </SafeAreaView>
  );
}
