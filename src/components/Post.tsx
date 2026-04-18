import { colors } from "@/theme/colors";
import { fonts } from "@/theme/typography";
import { Image, View, Text, StyleSheet } from "react-native";

interface Props {
  postImageUrl: string;
  postTitle: string;
  postPreview: string;
}

function Post({ postImageUrl, postTitle, postPreview }: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: postImageUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{postTitle}</Text>
        <Text style={styles.preview}>{postPreview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.postBackground,
    marginBlockEnd: 16,
  },
  image: {
    width: "100%",
    height: 393,
  },

  textContainer: {
    marginBlockStart: 8,
    marginBlockEnd: 16,
    paddingInline: 16,
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.bold,
    marginBlockEnd: 8,
  },

  preview: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 20,
  },
});

export default Post;
