import React, { Suspense, useEffect, useState, useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { infoSvg, playListButton, tapButton } from "@/utils/data";
import useUserInfoStore from "@/store/useUserInfoStore";
import Loading from "@/components/units/Loading";
import Image from "next/image";
import pin from "features/assets/lp/lp-pin.svg";
import menu from "../../features/assets/icons/menu.svg";
import Sidebar from "@/components/units/Sidebar";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserInfoStore();
  const [isPending, startTransition] = useTransition();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
            const { email, userName, mainBackground, mainLp, playList } =
              res.data.userInfo;
            startTransition(() => {
              setUserInfo({
                ...userInfo,
                email,
                userName,
                mainBackground: mainBackground.toLowerCase(),
                mainLp: mainLp.toLowerCase(),
                playList: playList,
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
        <div className="flex flex-col w-full h-full m-auto max-w-sm max-h-full items-center justify-center z-10 font-pretendard font-semibold ">
          <div className="relative">
            <div className="absolute top-10 left-3 p-2 z-20">
              <button type="button" onClick={toggleSidebar}>
                <Image src={menu} width={24} height={24} alt="menu" />
              </button>
            </div>
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
            <div className="absolute bottom-[23%] left-[10%]">
              {userInfo &&
                userInfo.playList &&
                userInfo.playList.map((_, index) => (
                  <div key={index}>
                    {index + 1}. [{index}]
                  </div>
                ))}
              {userInfo && userInfo.playList && (
                <div>총 {userInfo.playList.length}명</div>
              )}
            </div>
          </div>
        </div>
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </Suspense>
  );
};

export default MainPage;
