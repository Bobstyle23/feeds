import { router } from "expo-router";
import StateScreen from "./StateScreen";

export const EmptyState = () => {
  return (
    <StateScreen
      title="По вашему запросу ничего не найдено"
      buttonTitle="На главную"
      onClick={() => router.back()}
    />
  );
};
