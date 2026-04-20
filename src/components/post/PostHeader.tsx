import { Author } from "@/entities/Author";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";
import { fonts } from "@/theme/typography";
import { Image, StyleSheet, Text, View } from "react-native";

type AuthorInfo = Pick<Author, "avatarUrl" | "displayName">;

interface Props {
  author: AuthorInfo;
}

function PostHeader({ author }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: author.avatarUrl }} style={styles.avatar} />
      <Text style={styles.author}>{author.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: spacing[16],
    paddingBlock: spacing[12],
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[12],
    backgroundColor: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  author: {
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
    fontFamily: fonts.bold,
  },
});

export default PostHeader;
