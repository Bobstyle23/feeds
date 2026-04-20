import { usePost } from "@/hooks/usePost";
import ExpandableText from "../common/ExpandableText";

interface Props {
  postId: string;
}

function PostContent({ postId }: Props) {
  const { data: post } = usePost(postId);

  if (!post) return null;

  return (
    <ExpandableText
      title={post?.title}
      body={post?.body}
      preview={post?.preview}
      tier={post?.tier}
    />
  );
}

export default PostContent;
