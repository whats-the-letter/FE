import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function RedirectPage() {
  const router = useRouter();

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
            // 로그인 성공
            // console.log(res);
            // let content = res.headers["content-type"];
            // let accessToken = res.headers.authorization;

            // let token = res.headers["authorization"];
            // console.log("응답 헤더 - ", content);
            // console.log("소문자 표기 토큰 - ", accessToken);

            // console.log("대괄호  토큰 - ", token);

            //토큰을 쿠키에 저장
            console.log("로그인 성공");
            console.log("User Info:", res.data.userInfo);
            router.push({});
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            // 유효하지 않은 코드
            console.log(err.response);
          } else if (err.response && err.response.status === 404) {
            // 회원가입 필요
            console.log(err.response);

            console.log(err.response.data.userInfo.email);
            const kakaoEmail = err.response.data.userInfo.email
              ? err.response.data.userInfo.email
              : "";

            // 404 인 경우 우리 서비스 회원가입 페이지 이동
            router.push({
              pathname: "/info",
              query: {
                email: kakaoEmail,
              },
            });
          }
        });
    }
  }, [router]);

  return <div>Redirecting...</div>;
}
