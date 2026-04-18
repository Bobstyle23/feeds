import { Image, StyleSheet } from "react-native";

interface Props {
  imageUrl: string;
}

function PostImage({ imageUrl }: Props) {
  return <Image style={styles.image} source={{ uri: imageUrl }} />;
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 393,
  },
});

export default PostImage;
