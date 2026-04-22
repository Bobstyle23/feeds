import {
  PostFooterSkeleton,
  PostImageSkeleton,
  PostContentSkeleton,
  PostHeaderSkeleton,
} from "./index";

function PostsSkeleton() {
  return (
    <>
      <PostHeaderSkeleton />
      <PostImageSkeleton />
      <PostContentSkeleton />
      <PostFooterSkeleton />
    </>
  );
}

export default PostsSkeleton;
