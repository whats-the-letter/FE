import React, { useState } from "react";
import "../public/styles/globals.css";
import type { AppProps } from "next/app";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            toastOptions={{
              style: {
                fontFamily: "Pretendard",
                fontWeight: 500,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                background: "#3F3F3F",
                color: "#fff",
                
              },
              // 아이콘 아예 제거
              // success: {
              //   icon: "",
              // },
              // error: {
              //   icon: "",
              // },

              iconTheme: {
                primary: "#fff",
                secondary: "#3F3F3F",
              },
            }}
          />
        </OverlayProvider>
      </QueryClientProvider>
    </>
  );
}
