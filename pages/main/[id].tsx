import React, { Suspense, useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { infoSvg, playListButton, tapButton } from "@/utils/data";
import Image from "next/image";
import pin from "features/assets/lp/lp-pin.svg";
import useUserInfoStore from "@/store/useUserInfoStore";
import Loading from "@/components/units/Loading";

const MainPage: React.FC = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const userId = userInfo.userId;
    const email = userInfo.email;
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
            console.log(res.data.userInfo);
            const { email, userName, mainBackground, mainLp } =
              res.data.userInfo;
            startTransition(() => {
              setUserInfo({
                ...userInfo,
                email,
                userName,
                mainBackground: mainBackground.toLowerCase(),
                mainLp: mainLp.toLowerCase(),
              });
              console.log(userInfo);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo.userId]);

  return (
    <Suspense fallback={<Loading />}>
      {userInfo && (
        <div className="flex flex-col w-full h-screen p-2 items-center justify-center z-10 m-auto space-y-10 font-pretendard font-semibold ">
          <div className="relative">
            <img
              className="w-full h-full object-cover "
              src={
                infoSvg.main[
                  userInfo.mainBackground as keyof typeof infoSvg.main
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
              onClick={() => router.push(`/collection`)}
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
    </Suspense>
  );
};

export default MainPage;
