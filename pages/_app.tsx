import React, { useState } from "react";
import "../public/styles/globals.css";
import type { AppProps } from "next/app";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Head from "next/head";
import MetaHead from "@/components/units/MetaHead";


export const queryClient = new QueryClient();

export const QueryClientWrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MetaHead />
      <Head>
        <title> What&apos;s the Letter? </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <Component {...pageProps} />
        </OverlayProvider>
      </QueryClientProvider>
    </>
  );
}
