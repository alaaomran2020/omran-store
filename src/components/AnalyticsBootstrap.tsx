"use client";

import { useEffect } from "react";
import { captureAttribution, trackPageView } from "@/lib/analytics";

export function AnalyticsBootstrap() {
  useEffect(() => {
    captureAttribution();
    trackPageView();
  }, []);

  return null;
}
