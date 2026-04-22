import {
  PostFooterSkeleton,
  PostImageSkeleton,
  PostContentSkeleton,
  PostHeaderSkeleton,
} from "./index";

function PostSkeleton() {
  return (
    <>
      <PostHeaderSkeleton />
      <PostImageSkeleton />
      <PostContentSkeleton />
      <PostFooterSkeleton />
    </>
  );
}

export default PostSkeleton;
