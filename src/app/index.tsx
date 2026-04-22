import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "@/theme/colors";
import PostItem from "@/components/post/PostItem";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import PostsSkeleton from "@/components/skeleton/PostsSkeleton";

export default function HomeScreen() {
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
  } = usePosts();

  const queryClient = useQueryClient();
  const skeletons = [1, 2, 3, 4, 5];

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  return (
    <SafeAreaView>
      {isLoading &&
        skeletons.map((_, index) => (
          <View key={index}>
            <PostsSkeleton />
          </View>
        ))}
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
