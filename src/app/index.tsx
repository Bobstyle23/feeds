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
import { fonts } from "@/theme/typography";

export default function HomeScreen() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    isError,
    error,
    refetch,
    isLoadingError,
  } = usePosts();

  const queryClient = useQueryClient();

  if (isLoading) return <ActivityIndicator />;

  console.log(isLoadingError);

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong 😢</Text>

        <TouchableOpacity onPress={() => refetch()} style={{ marginTop: 12 }}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  return (
    <SafeAreaView>
      <FlatList
        style={{ backgroundColor: colors.bodyBackground }}
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
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator />
          ) : !isFetchingNextPage && hasNextPage ? (
            <View style={{ marginInline: 16 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6C2BD9",
                  borderRadius: 14,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 42,
                }}
                onPress={() => fetchNextPage()}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: fonts.medium,
                    fontSize: 15,
                  }}
                >
                  Повторить загрузку след. страницы
                </Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
