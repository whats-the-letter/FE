import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/components/collection/components/Loading";

const Redirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkUserMembership = async () => {
      try {
        console.log(session?.user?.email);

        if (status === "authenticated") {
          const response = await axios.post("http://13.125.242.16/auth/login", {
            email: session?.user?.email,
          });
          console.log(response);
          if (response.status === 200) {
            router.replace("/main");
          } else if (response.status === 404) {
            // 회원이 아니라면 회원가입 페이지로 이동
            router.replace("/info");
          } else {
            // 기타 응답 코드에 따라 처리
            console.error("Unexpected response:", response);
            signOut();
          }
        } else {
          // 로그인이 되어있지 않다면 로그인 페이지로 이동
          router.replace("/");
        }
      } catch (error) {
        console.error(error);
        // 에러 발생 시 기본적으로 홈페이지로 이동
        router.replace("/newalbum");
      }
    };

    checkUserMembership();
  }, [router, status, session]);

  return <Loading />;
};

export default Redirect;
