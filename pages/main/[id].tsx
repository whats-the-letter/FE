import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { infoSvg, playListButton, tapButton } from "@/utils/data";
import Image from "next/image";
import pin from "features/assets/lp/lp-pin.svg";

interface UserInfo {
  email: string | string[];
  userName: string;
  mainBackground: keyof typeof infoSvg.mainBackground;
  mainLp: keyof typeof infoSvg.mainLp;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userId = router.query.userId;
    const email = router.query.email;

    //userId와 토큰을 가지고 유저정보를 가져옴
    if (token && userId && email) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/main/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const userData = res.data;

            setUserInfo({
              email: email,
              userName: userData.userInfo.userName,
              mainBackground: userData.userInfo.mainBackground.toLowerCase(),
              mainLp: userData.userInfo.mainLp.toLowerCase(),
            });
            console.log(token);
            console.log(userId);
            console.log(userData);

            console.log(userData.userInfo.mainBackground);
            console.log(userData.userInfo.mainBackground.toLowerCase());
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.query.userId, router.query.email]);

  return (
    <>
      {userInfo && (
        <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 font-pretendard font-semibold ">
          <div className="relative">
            <img
              className="w-full h-full object-cover "
              src={infoSvg.main[userInfo.mainBackground]}
              alt="preview-background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="transform -translate-x-1/2 -translate-y-1/2 rotate-infinite mt-10"
                src={infoSvg.mainLp[userInfo.mainLp]}
                alt="preview-lpDesign"
              />
            </div>
            <img
            onClick={() => router.push(`/collection/`)}
              src={tapButton[`tap-${userInfo.mainBackground}`]}
              alt="tap-button"
              className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce hover:cursor-pointer hover:scale-110"
              
            />
            <Image
              src={pin}
              alt="lp-pin"
              className="absolute top-[40%] left-[65%]"
            />
            <img
              className="absolute top-[68%] left-[8%]"
              src={playListButton[`playlist-${userInfo.mainBackground}`]}
              alt="playlist"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
