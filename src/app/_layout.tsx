import React from "react";
import HomeScreen from ".";
import { QueryProvider } from "@/providers/QueryProvider";

export default function TabLayout() {
  return (
    <QueryProvider>
      <HomeScreen />
    </QueryProvider>
  );
}
