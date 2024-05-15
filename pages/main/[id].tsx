import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { infoSvg, playListButton, tapButton } from "@/utils/data";
import Image from "next/image";
import pin from "features/assets/lp/lp-pin.svg";
import useGetToken from "@/hooks/useGetToken";
import useUserInfoStore from "@/store/useUserInfoStore";
import Loading from "@/components/units/Loading";

interface UserInfo {
  email: string | string[];
  userName: string;
  mainBackground: keyof typeof infoSvg.mainBackground;
  mainLp: keyof typeof infoSvg.mainLp;
}

const MainPage: React.FC = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserInfoStore();

  useEffect(() => {
    // 로컬 스토리지에서 userInfo를 로드합니다.
    const loadUserInfo = localStorage.getItem("userInfo");
    if (loadUserInfo) {
      setUserInfo(JSON.parse(loadUserInfo));
    }
  }, []);

  useEffect(() => {
    // userInfo 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    const userId = userInfo.userId;
    const token = localStorage.getItem("accessToken");
    console.log(userId);
    if (token && userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/main/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            const { email, userName, mainBackground, mainLp } =
              res.data.userInfo;
            setUserInfo({
              ...userInfo,
              email,
              userName,
              mainBackground: mainBackground.toLowerCase(),
              mainLp: mainLp.toLowerCase(),
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo.userId]);

  return (
    <>
      {userInfo && (
        <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 font-pretendard font-semibold ">
          <div className="relative">
            <img
              className="w-full h-full object-cover "
              src={
                infoSvg.mainBackground[
                  userInfo.mainBackground as keyof typeof infoSvg.mainBackground
                ]
              }
              alt="preview-background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="transform -translate-x-1/2 -translate-y-1/2 rotate-infinite mt-10"
                src={
                  infoSvg.mainLp[userInfo.mainLp as keyof typeof infoSvg.mainLp]
                }
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
