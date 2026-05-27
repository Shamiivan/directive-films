import { ConvexReactClient } from "convex/react";

const url = import.meta.env.VITE_CONVEX_URL as string | undefined;

export const convexClient: ConvexReactClient | null = url
  ? new ConvexReactClient(url)
  : null;

export const isConvexConfigured = Boolean(url);
