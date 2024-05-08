interface ShareToKakaoArg {
  templateId: number;
  installTalk?: boolean;
  templateArgs: {
    SURVEY_PATH: string;
  };
  serverCallbackArgs?: {};
}
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production";
      readonly NEXT_PUBLIC_G_TAG: string;
      // readonly CHROMATIC_PROJECT_TOKEN: string
      readonly NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
      readonly NEXT_PUBLIC_BASE_URL: string;
      readonly NEXT_PUBLIC_KAKAO_APP_KEY: string;
      readonly NEXT_PUBLIC_YOUTUBE_API_KEY: string;
      readonly KAKAO_CLIENT_SECRET: string;
      readonly NEXT_PUBLIC_KAKAO_REDIRECT_URI: string;
      readonly NEXT_PUBLIC_KAKAO_AUTH_URL: string;
    }
  }
//   interface Window {
//     Kakao?: {
//       init: (key: string) => void;
//       isInitialized: () => boolean;
//       Share: {
//         sendCustom: (args: ShareToKakaoArg) => void;
//       };
//     };
//   }
}
