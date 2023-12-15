import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/components/units/Loading";

const Redirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUserMembership = async () => {
      try {
        console.log(session?.user?.email);

        if (status === "authenticated") {
          // 로그인이 되어있다면 회원인지 확인
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
            {
              email: session?.user?.email,
            }
          );
          console.log(response);
          if (response.status === 200) {
            router.replace("/main");
            // } else if (response.status === 404) {
            //   // 회원이 아니라면 회원가입 페이지로 이동
            //   router.replace("/info");
          } else {
            // 기타 응답 코드에 따라 처리
            console.error("Unexpected response:", response);
            signOut();
          }
        } else {
          // 카카오 로그인은 성공했지만, 404 에러가 뜬 경우 우리 회원이 아니므로, 회원가입 페이지로 이동
          router.replace("/info");
        }
      } catch (error) {
        console.error("error", error);
        // 에러 발생 시 기본적으로 홈페이지로 이동
        router.replace("/");
      }
    };

    checkUserMembership();
  }, [router, status, session]);

  return <Loading />;
};

export default Redirect;
