import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { usePosts } from "@/hooks/usePosts";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQueryClient } from "@tanstack/react-query";

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
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text>{item.title}</Text>
            <Text>{item.preview}</Text>
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
