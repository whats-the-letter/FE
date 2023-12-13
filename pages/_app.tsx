import React, { useState } from "react";
import "../public/styles/globals.css";
import type { AppProps } from "next/app";
import { OverlayProvider } from "@toss/use-overlay";

import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import RefreshTokenHandler from "../features/auth/RefreshTokenHandler";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router: { route },
}: AppProps) {
  const [sessionRefetchInterval, setSessionRefetchInterval] = useState(10000);

  return (
    <>
      <Head>
        <title>Dear New Year</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider
        session={pageProps.session}
        refetchInterval={sessionRefetchInterval}
      >
        <RefreshTokenHandler
          setSessionRefetchInterval={setSessionRefetchInterval}
        >
          <OverlayProvider>
            <Component {...pageProps} />
          </OverlayProvider>
        </RefreshTokenHandler>
      </SessionProvider>
    </>
  );
}
