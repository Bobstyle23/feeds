import { StyleSheet, View, Text } from "react-native";
import { Button } from "../ui/Button";

export const EmptyState = () => (
  <View style={styles.container}>
    <Text>По вашему запросу ничего не найдено</Text>
    <Button title="На главную" onPress={() => {}} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
