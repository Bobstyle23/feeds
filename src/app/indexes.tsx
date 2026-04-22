import { FlatList, ActivityIndicator, View } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@/theme/colors";
import PostItem from "@/components/post/PostItem";

import { ErrorState } from "@/components/states/ErrorState";

export default function HomeScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    refetch,
  } = usePosts();

  const queryClient = useQueryClient();

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (isLoading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  return (
    <SafeAreaView>
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
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
