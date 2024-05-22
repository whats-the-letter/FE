import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/components/units/Loading";
import useGetToken from "@/hooks/useGetToken";
import useUserInfoStore from "@/store/useUserInfoStore";

export default function RedirectPage() {
  const router = useRouter();
  const { token, setToken, refreshAccessToken } = useGetToken();
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  useEffect(() => {
    if (token && token.expiresAt && new Date().getTime() > token.expiresAt) {
      refreshAccessToken();
    }
  }, [token, refreshAccessToken]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login/kakao/code?code=${code}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 200) {
            let accessToken = res.headers.authorization;
            accessToken = accessToken.replace("Bearer ", "");
            let expiresAt = new Date().getTime() + 3000 * 1000; // 토큰 만료 시간
            setToken({
              accessToken,
              refreshToken: res.data.refreshToken,
              expiresAt: expiresAt,
            });
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresAt", expiresAt.toString());
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            const userInfo = res.data.userInfo;
            setUserInfo(userInfo);

            const redirectPath =
              localStorage.getItem("redirectAfterLogin") ||
              `/main/${userInfo.userId}`;
            localStorage.removeItem("redirectAfterLogin"); // 저장된 리디렉션 경로 삭제
            router.push(redirectPath);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            router.push({
              pathname: `/info`,
              query: { email: err.response.data.userInfo.email },
            });
          }
        });
    }
  }, [router, setToken, setUserInfo]);

  return <Loading />;
}
