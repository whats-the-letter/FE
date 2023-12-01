import React from "react";
import "../public/styles/globals.css";
import type { AppProps } from "next/app";
import { OverlayProvider } from "@toss/use-overlay";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OverlayProvider>
      <Component {...pageProps} />
    </OverlayProvider>
  );
}
