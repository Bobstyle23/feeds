import StateScreen from "./StateScreen";

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <StateScreen
    title="Не удалось загрузить публикации"
    buttonTitle="Повторить"
    onClick={onRetry}
  />
);
