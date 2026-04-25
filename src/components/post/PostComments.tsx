import { Post } from "@/entities/Post";
import { useComments } from "@/hooks/useComments";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import PostComment from "./PostComment";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  post: Post;
}

function PostComments({ post }: Props) {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useComments(post.id);

  const comments = data?.pages.flatMap((comment) => comment.comments) ?? [];
  const queryClient = useQueryClient();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.commentsCount}>
          {post.commentsCount} комментариев
        </Text>
        <Pressable onPress={() => console.log("pressed")}>
          <Text style={styles.sortText}>Сначала новые</Text>
        </Pressable>
      </View>
      <FlatList
        style={{ maxHeight: 360 }}
        data={comments}
        keyExtractor={(comment) => comment.id}
        renderItem={({ item }) => (
          <PostComment author={item.author} comment={item} />
        )}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isFetching}
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["post", post.id] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginInline: spacing[16],
    marginBlockEnd: spacing[12],
    gap: spacing[8],
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: fonts.semiBold,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
    color: "#68727D",
  },
  sortText: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
    color: colors.primaryDeep,
  },
});

export default PostComments;
