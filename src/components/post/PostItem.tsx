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
    <View style={{ backgroundColor: colors.white, marginBlockEnd: 16 }}>
      <PostHeader author={post.author} />
      <PostImage imageUrl={post.coverUrl} tier={post.tier} />
      <PostContent post={post} />
      {post.tier !== "paid" ? <PostFooter post={post} /> : null}
    </View>
  );
}

export default PostItem;
