import { fonts } from "@/theme/typography";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  preview: string;
}

function PostContent({ title, preview }: Props) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={2} style={styles.preview}>
        {preview}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default PostContent;
