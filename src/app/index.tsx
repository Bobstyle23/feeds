import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";
import PostHeader from "@/components/PostHeader";
import Post from "@/components/Post";

export default function HomeScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePosts();

  const queryClient = useQueryClient();

  if (isLoading) return <ActivityIndicator />;

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  return (
    <SafeAreaView>
      <FlatList
        style={{ backgroundColor: "#F5F8FD" }}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <PostHeader
              avatarUrl={item.author.avatarUrl}
              author={item.author.displayName}
            />

            <Post
              postImageUrl={item.coverUrl}
              postTitle={item.title}
              postPreview={item.preview}
            />
          </View>
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        }}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
