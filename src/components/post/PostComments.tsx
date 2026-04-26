import { Post } from "@/entities/Post";
import { useComments } from "@/hooks/useComments";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
} from "react-native";
import PostComment from "./PostComment";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import PostCommentSkeleton from "../skeleton/PostCommentSkeleton";
import SendIconDefault from "@/assets/images/send-icon-disabled.svg";
import SendIconActive from "@/assets/images/send-icon-active.svg";

interface Props {
  post: Post;
}

function PostComments({ post }: Props) {
  const [sort, setSort] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  const {
    data,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useComments(post.id);

  const comments = data?.pages.flatMap((comment) => comment.comments) ?? [];

  const sortedComments = sort
    ? [...comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : comments;
  const queryClient = useQueryClient();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.commentsCount}>
          {post.commentsCount} комментариев
        </Text>
        <Pressable onPress={() => setSort(!sort)}>
          <Text style={styles.sortText}>
            Сначала {sort ? "старые" : "новые"}
          </Text>
        </Pressable>
      </View>
      <FlatList
        style={{ maxHeight: 360 }}
        data={sortedComments}
        keyExtractor={(comment) => comment.id}
        renderItem={({ item }) =>
          isLoading ? (
            <PostCommentSkeleton key={item.id} />
          ) : (
            <PostComment author={item.author} comment={item} />
          )
        }
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isFetching}
        onRefresh={() => {
          queryClient.invalidateQueries({ queryKey: ["post", post.id] });
        }}
        ListEmptyComponent={isLoading ? <PostCommentSkeleton /> : null}
        ListFooterComponent={
          isFetchingNextPage ? <PostCommentSkeleton /> : null
        }
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ваш комментарий"
          cursorColor={colors.black}
          selectionColor={colors.black}
        />
        {inputText ? (
          <Pressable>
            <SendIconActive width={30} height={30} />
          </Pressable>
        ) : (
          <Pressable>
            <SendIconDefault width={30} height={30} />
          </Pressable>
        )}
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderRadius: 20,
    borderColor: "#EFF2F7",
    borderWidth: 2,
    paddingBlock: 10,
    paddingInline: spacing[16],
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
    maxWidth: 320,
    width: "100%",
  },
});

export default PostComments;
