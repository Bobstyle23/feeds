import { Post } from "@/entities/Post";
import { useComments, useSendComment } from "@/hooks/useComments";
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
  LayoutAnimation,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import PostComment from "./PostComment";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { commentDraftStore } from "@/stores/commentDraftStore";
import PostCommentSkeleton from "../skeleton/PostCommentSkeleton";
import SendIconDefault from "@/assets/images/send-icon-disabled.svg";
import SendIconActive from "@/assets/images/send-icon-active.svg";

interface Props {
  post: Post;
}

const PostComments = observer(function PostComments({ post }: Props) {
  const [sort, setSort] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useComments(post.id);

  const inputText = commentDraftStore.getDraft(post.id);

  const { mutate, status } = useSendComment();

  const inputRef = useRef<TextInput>(null);

  const comments = data?.pages.flatMap((comment) => comment.comments) ?? [];

  const uniqueComments = Array.from(
    new Map(comments.map((comment) => [comment.id, comment])).values(),
  );

  const sortedComments = sort
    ? [...uniqueComments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : uniqueComments;

  const handleSendComment = () => {
    const text = commentDraftStore.getDraft(post.id);
    if (!text.trim()) return;
    mutate({ postId: post.id, text: text });

    commentDraftStore.clearDraft(post.id);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (inputText.length > 0) {
      inputRef.current?.focus();
    }
  }, [post.id]);

  useEffect(() => {
    if (inputText.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, [inputText]);

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
            <PostComment key={item.id} comment={item} />
          )
        }
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListEmptyComponent={isLoading ? <PostCommentSkeleton /> : null}
        ListFooterComponent={
          isFetchingNextPage ? <PostCommentSkeleton /> : null
        }
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.blur()}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={inputText}
            ref={inputRef}
            onChangeText={(text) => commentDraftStore.setDraft(post.id, text)}
            placeholder="Ваш комментарий"
            cursorColor={colors.black}
            selectionColor={colors.black}
            onFocus={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            underlineColorAndroid="transparent"
          />
          {inputText ? (
            <Pressable
              disabled={status === "loading"}
              onPress={handleSendComment}
            >
              <SendIconActive width={30} height={30} />
            </Pressable>
          ) : (
            <Pressable>
              <SendIconDefault width={30} height={30} />
            </Pressable>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
});

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
    padding: 0,
    margin: 0,
    textAlignVertical: "top",
    height: 40,
    width: "100%",
    maxWidth: 320,
    borderRadius: 20,
    backgroundColor: colors.uiBase,
    paddingVertical: spacing[10],
    paddingHorizontal: spacing[16],
    fontFamily: fonts.medium,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
  },

  inputFocused: {
    borderColor: colors.uiBase,
    backgroundColor: colors.white,
    borderWidth: 2,
    color: colors.black,
  },
});

export default PostComments;
