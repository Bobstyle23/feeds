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
  bodyText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    lineHeight: 20,
    color: colors.primaryDeep,
  },

  paidContainer: {
    marginBlockStart: 8,
    marginBlockEnd: 12,
    marginInline: 16,
    gap: 8,
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
