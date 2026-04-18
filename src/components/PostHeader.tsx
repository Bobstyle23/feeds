import { fonts } from "@/theme/typography";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
  avatarUrl: string;
  author: string;
}

function PostHeader({ author, avatarUrl }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text style={styles.author}>{author}</Text>
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
