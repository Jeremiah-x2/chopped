import { useAppState } from "@/hooks/useAppState";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { AppStateStatus, Platform } from "react-native";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAppState(onAppStateChange);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
