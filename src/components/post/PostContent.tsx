import { ExpandableText } from "../common/ExpandableText";
import { Post } from "@/entities/Post";

interface Props {
  post: Post;
}

function PostContent({ post }: Props) {
  return <ExpandableText post={post} />;
}

export default PostContent;
