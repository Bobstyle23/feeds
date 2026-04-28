import { router } from "expo-router";
import StateScreen from "./StateScreen";

export const EmptyState = () => {
  const handleBack = () => router.back();
  return (
    <StateScreen
      title="По вашему запросу ничего не найдено"
      buttonTitle="На главную"
      onClick={handleBack}
    />
  );
};
