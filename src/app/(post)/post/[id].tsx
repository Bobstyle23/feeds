// app/post/[id].tsx
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePost } from "@/hooks/usePost";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = usePost(id as string);

  if (!post) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Text>{post.title}</Text>
      <Text>{post.body}</Text>
    </SafeAreaView>
  );
}
