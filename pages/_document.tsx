import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
