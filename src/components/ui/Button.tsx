import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import React from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        style,
        disabled && styles.disabled,
        pressed && styles.pressed,
        loading && styles.loading,
      ]}
    >
      {({ pressed }) => {
        return loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.text, textStyle, pressed && styles.textPressed]}>
            {title}
          </Text>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDeep,
    borderRadius: spacing[14],
  },

  disabled: {
    backgroundColor: colors.primaryMuted,
  },

  loading: {
    backgroundColor: colors.primaryHover,
  },

  text: {
    color: colors.white,
  },

  pressed: {
    backgroundColor: colors.primaryHover,
  },

  textPressed: {
    color: colors.primaryLight,
  },
});
