import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LikeIcon from "@/assets/images/like-icon.svg";
import LikeIconFull from "@/assets/images/like-icon-full.svg";
import CommentIcon from "@/assets/images/comment-icon.svg";
import { fonts } from "@/theme/typography";
import { useToggleLike } from "@/hooks/useLike";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { usePost } from "@/hooks/usePost";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface Props {
  postId: string;
}

function PostFooter({ postId }: Props) {
  const { mutate } = useToggleLike();
  const { data: post } = usePost(postId);

  if (!post) return;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: post.isLiked ? colors.accent : colors.uiBase,
  }));

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });

    mutate(post.id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLike}>
        <Animated.View style={[styles.subContainer, animatedStyle]}>
          {post.isLiked ? (
            <LikeIconFull width={24} height={24} />
          ) : (
            <LikeIcon width={24} height={24} />
          )}

          <Text
            style={{
              color: post.isLiked ? colors.accentLight : "",
              ...styles.text,
            }}
          >
            {post.likesCount}
          </Text>
        </Animated.View>
      </TouchableOpacity>

      <View
        style={{
          ...styles.subContainer,
          backgroundColor: colors.uiBase,
        }}
      >
        <CommentIcon width={24} height={24} />
        <Text style={styles.text}>{post.commentsCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing[8],
    paddingInlineStart: spacing[16],
    paddingBlockEnd: spacing[12],
  },
  subContainer: {
    width: 63,
    height: 36,
    borderRadius: 9999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[4],
    paddingInlineStart: spacing[6],
    paddingInlineEnd: spacing[12],
    paddingBlock: spacing[6],
  },
  text: {
    fontSize: fontSize.xs2,
    lineHeight: lineHeight.lg,
    fontFamily: fonts.bold,
  },
});

export default PostFooter;
