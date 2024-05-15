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
            console.log(res);

            let accessToken = res.headers.authorization;
            accessToken = accessToken.replace("Bearer ", "");
            let expiresAt = new Date().getTime() + 3000 * 1000;
            setToken({
              accessToken,
              refreshToken: res.data.refreshToken,
              expiresAt: expiresAt,
            });
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("expiresAt", expiresAt.toString());
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            console.log("로그인 성공");

            const userInfo = res.data.userInfo;
            setUserInfo(userInfo);

            router.push(`/main/${userInfo.userId}`);
          }
        })
        .catch((err) => {
          console.error("로그인 실패", err);
          if (err.response && err.response.status === 404) {
            // 사용자가 우리 서비스의 회원이 아닐 때 404 에러 처리
            console.log("회원가입 필요", err.response);

            router.push({
              pathname: `/info`,

              query: { email: err.response.data.email },
            });
          }
        });
    }
  }, [router, setToken, setUserInfo]);

  return <Loading />;
}
