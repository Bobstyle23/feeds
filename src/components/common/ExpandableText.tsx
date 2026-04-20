import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { fontSize, lineHeight, spacing } from "@/theme/spacing";

interface Props {
  title: string;
  tier: string;
  preview: string;
  body: string;
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function ExpandableText({ title, body, preview, tier }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(true);
  };

  if (tier == "paid") {
    return (
      <View style={styles.paidContainer}>
        <Text style={styles.paidText}></Text>
        <Text style={{ ...styles.paidText, width: "100%", height: 40 }}></Text>
      </View>
    );
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.preview} numberOfLines={expanded ? undefined : 2}>
        {expanded ? body || preview : preview}
      </Text>

      {!expanded && body && (
        <View style={styles.overlayContainer}>
          <LinearGradient
            colors={["rgba(255,255,255,0)", colors.white]}
            style={styles.verticalGradient}
            start={{ x: 10, y: 0 }}
            end={{ x: -1, y: 0 }}
          />
          <LinearGradient colors={["rgb(255,255,255)", colors.white]}>
            <TouchableOpacity onPress={handleToggle}>
              <Text style={styles.bodyText}>Показать еще</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginBlockStart: spacing[8],
    marginBlockEnd: spacing[16],
    paddingInline: spacing[16],
  },
  title: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontFamily: fonts.bold,
    marginBlockEnd: spacing[8],
  },
  preview: {
    fontFamily: fonts.medium,
    fontSize: fontSize.sm2,
    lineHeight: lineHeight.sm,
  },
  bodyText: {
    fontSize: fontSize.sm2,
    fontFamily: fonts.medium,
    lineHeight: lineHeight.sm,
    color: colors.primaryDeep,
  },

  paidContainer: {
    marginBlockStart: spacing[8],
    marginBlockEnd: spacing[12],
    marginInline: spacing[16],
    gap: spacing[8],
  },
  paidText: {
    width: 164,
    height: 26,
    borderRadius: 22,
    backgroundColor: "rgba(238, 239, 241, 0.8)",
  },

  overlayContainer: {
    position: "absolute",
    bottom: 0,
    width: 120,
    right: 16,
    alignItems: "flex-end",
  },

  verticalGradient: {
    position: "absolute",
    bottom: 0,
    height: 20,
    width: "100%",
  },
});

export default ExpandableText;
