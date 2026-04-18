import { Author } from "@/entities/Author";
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
    paddingInline: 16,
    paddingBlock: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  author: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fonts.bold,
  },
});

export default PostHeader;
