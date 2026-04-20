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

  if (isLoading) return <ActivityIndicator />;

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginInline: 16,
        }}
      >
        <Text>Something went wrong 😢</Text>

        <Button
          title="Повторить"
          onPress={() => refetch()}
          style={{ width: "100%", height: 42 }}
          textStyle={{
            fontSize: 15,
            fontFamily: fonts.semiBold,
            lineHeight: 26,
          }}
        />
      </View>
    );
  }

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
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator />
          ) : !isFetchingNextPage ? (
            <View style={{ marginInline: 16 }}>
              <Button
                title="Повторить загрузку след. страницы"
                onPress={() => fetchNextPage()}
                style={{
                  backgroundColor: colors.primary,
                  width: "100%",
                  height: 42,
                }}
                textStyle={{
                  fontSize: 15,
                  fontFamily: fonts.medium,
                }}
              />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
