// app/(tabs)/index.tsx

import { FlatList, ActivityIndicator, View } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@/theme/colors";
import PostItem from "@/components/post/PostItem";

import { ErrorState } from "@/components/states/ErrorState";
import SegmentedTabs from "@/components/common/SegmentedTabs";
import { useState } from "react";
import PostsSkeleton from "@/components/skeleton/PostsSkeleton";
import { EmptyState } from "@/components/states/EmptyState";

type Tabs = "all" | "free" | "paid";

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tabs>("all");

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    isFetching,
    refetch,
  } = usePosts(activeTab);

  const queryClient = useQueryClient();
  const skeletons = [1, 2, 3, 4, 5];

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SegmentedTabs value={activeTab} onChange={setActiveTab} />
      {isLoading ||
        (!posts &&
          skeletons.map((_, index) => (
            <View key={index}>
              <PostsSkeleton />
            </View>
          )))}
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
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
