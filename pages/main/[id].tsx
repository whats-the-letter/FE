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
import { useQuery } from "@tanstack/react-query";

const getUserInfo = async (userId: string, token: string | null) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/main/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.userInfo;
};

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo, setUserInfo } = useUserInfoStore();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  
  const { data, isLoading, error } = useQuery(
    ["userInfo", userInfo.userId],
    () => getUserInfo(userInfo.userId, token),
    {
      // enabled: !!userInfo.userId && !!token,
      onSuccess: (data) => {
        const { email, userName, mainBackground, mainLp, playlist } = data;
        console.log(data)
        setUserInfo({
          ...userInfo,
          email,
          userName,
          mainBackground: mainBackground.toLowerCase(),
          mainLp: mainLp.toLowerCase(),
          playlist: playlist,
        });
      },

      onError: (error) => {
        console.log(error);
      },
    }
  );

  
  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;

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
            <div className=" absolute bottom-[18%] left-5 z-20 w-[340px] p-2">
              <div className="flex flex-wrap space-x-1 w-fulljustify-center items-center">
                {userInfo.playlist.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="text-semibold px-2 py-1">
                    <span className="text-sm">
                      {idx + 1}. {item}
                    </span>
                  </div>
                ))}
                <span className="text-sm">
                  ...Sincerely, <strong>{userInfo.playlist.length}</strong>{" "}
                  people
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </Suspense>
  );
};

export default MainPage;
