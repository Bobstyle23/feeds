import { FlatList, ActivityIndicator, View } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@/theme/colors";
import PostItem from "@/components/post/PostItem";

import { ErrorState } from "@/components/states/ErrorState";
import SegmentedTabs from "@/components/common/SegmentedTabs";
import { useEffect, useState } from "react";
import PostsSkeleton from "@/components/skeleton/PostsSkeleton";
import { EmptyState } from "@/components/states/EmptyState";
import { getPosts } from "@/api/endpoints/posts";

type Tabs = "all" | "free" | "paid";

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tabs>("all");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = usePosts(activeTab);

  const queryClient = useQueryClient();

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  useEffect(() => {
    if (data) setIsFirstLoad(false);
  }, [data]);

  if (isFirstLoad && isFetching) {
    return (
      <SafeAreaView>
        <PostsSkeleton />
      </SafeAreaView>
    );
  }

  const handlePrefetch = async (value: string) => {
    const existing = queryClient.getQueryData(["posts", value]);
    if (!existing) {
      await queryClient.prefetchInfiniteQuery({
        queryKey: ["posts", value],
        queryFn: ({ pageParam = null }) =>
          getPosts({
            cursor: pageParam,
            tier: value,
            limit: 10,
          }),
      });
    }

    setActiveTab(value as Tabs);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SegmentedTabs value={activeTab} onChange={handlePrefetch} />
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        // refreshing={isRefetching}
        refreshing={isFetching && !isFirstLoad}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
        ListEmptyComponent={isLoading ? <PostsSkeleton /> : <EmptyState />}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
