import { useLayoutEffect } from "react";

export const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
export const useBrowserLayoutEffect = process.browser
  ? useLayoutEffect
  : () => {};

export const kakaoInit = () => {
  if (typeof window !== "undefined" && !window.Kakao?.isInitialized()) {
    window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  }
  return !window.Kakao?.isInitialized();
};

export const shareToKaKaoLink = async (url: string) => {
  kakaoInit();
  window.Kakao?.Share.sendCustom({
    templateId: 101443,
    templateArgs: {
      SURVEY_PATH: url,
    },
  });
};

export const shareToCopyLink = async (url?: string) => {
  if (typeof window === "undefined") return;
  if (navigator?.share) {
    try {
      navigator.share({
        // url: url ?? window.location.origin,
        title: `What's the Letter? `,
        text: url ?? window.location.origin,
      });
    } catch (err) {
      await navigator.clipboard?.writeText(url ?? window.location.origin);
    }
  } else {
    await navigator.clipboard?.writeText(url ?? window.location.origin);
  }
  return true;
};
