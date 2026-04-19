import { View } from "react-native";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostContent from "./PostContent";
import { Post } from "@/entities/Post";
import { colors } from "@/theme/colors";
import PostFooter from "./PostFooter";

interface Props {
  post: Post;
}

function PostItem({ post }: Props) {
  return (
    <View
      style={{ backgroundColor: colors.postBackground, marginBlockEnd: 16 }}
    >
      <PostHeader author={post.author} />
      <PostImage imageUrl={post.coverUrl} />
      <PostContent title={post.title} preview={post.preview} />
      <PostFooter likes={post.likesCount} comments={post.commentsCount} />
    </View>
  );
}

export default PostItem;
