import React from "react";
import { View, StyleSheet } from "react-native";
import SkeletonText from "./SkeletonText";
import SkeletonCircle from "./SkeletonCircle";

const UserProfileSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <SkeletonCircle size={60} />
      <View style={styles.textContainer}>
        {/* Name */}
        <SkeletonText width="60%" height={20} />
        {/* Joined Date */}
        <SkeletonText width="40%" height={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff", // Light background
    borderRadius: 8,
    gap: 12,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
});

export default UserProfileSkeleton;
