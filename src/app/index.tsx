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
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/states/ErrorState";
import UserProfileSkeleton from "@/components/skeleton/UserProfileSkeleton";
import { EmptyState } from "@/components/states/EmptyState";

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

  console.log(isFetching, isLoading, isRefetching);

  const posts = data?.pages.flatMap((post) => post.posts) ?? [];

  // if (isLoading)
  //   return (
  //     // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //     //   <UserProfileSkeleton />
  //     // </View>
  //
  //     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  //
  return (
    <SafeAreaView>
      {isLoading &&
        skeletons.map((skeleton, index) => (
          <View key={index}>
            <UserProfileSkeleton />
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
        ListEmptyComponent={
          isLoading ? <UserProfileSkeleton /> : <EmptyState />
        }
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
