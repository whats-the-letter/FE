import Head from "next/head";

interface MetaHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}
const MetaHead = ({
  title,
  description = "음악과 함께 전하는 특별한 편지",
  url,
  image,
}: MetaHeadProps) => {
  return (
    <Head>
      <meta
        name="naver-site-verification"
        content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION}
      />
      <title>{title || "What's the Letter?"}</title>
      <meta name="description" content={description || ""} />
      <meta
        name="viewport"
        content="initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;"
      />
      <meta
        name="keywords"
        content="편지, 플레이리스트, 음악, 음악편지, LP, LP편지, LP음악, LP음악편지, LP편지음악"
      />
      <meta property="og:title" content={title || "What's the Letter?"} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || "https://whats-the-letter.site/"}
      />
      <meta property="og:description" content={description || ""} />
      <link rel="canonical" href="https://whats-the-letter.site/" />

      <meta
        property="og:image"
        content={
          image ??
          "https://res.cloudinary.com/dkvu1vslj/image/upload/v1715176032/meta_pbunlw.png"
        }
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/lp-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/lp-icon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/lp-icon.png" />
      {/* <link rel="manifest" href="/site.webmanifest" /> */}
      <link rel="mask-icon" href="/lp-icon.png" color="#5bbad5" />
      {/* <script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        defer
      ></script> */}
      {/* 
      <meta name="HandheldFriendly" content="true" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta> */}
    </Head>
  );
};
export default MetaHead;
