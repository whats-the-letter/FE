import axios from "axios";
import Image from "next/image";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import pin from "features/assets/lp/lp-pin.svg";
import useUserInfoStore from "@/store/useUserInfoStore";

interface PreivewInfoProps {
  submittedData: {
    email: string;
    userName: string;
    mainBackground: string;
    mainLp: string;
  };
  infoSvg: {
    mainBackground: Record<string, string>;
    mainLp: Record<string, string>;
  };
  playListButton: Record<string, string>;
  tapButton: Record<string, string>;
  onPrevious: () => void;
  onComplete: () => void;
}
const PreivewInfo: React.FC<PreivewInfoProps> = ({
  submittedData,
  playListButton,
  tapButton,
  infoSvg,
  onPrevious,
  onComplete,
}) => {
  const router = useRouter();
  const email = router.query.email;
  const { userInfo, setUserInfo } = useUserInfoStore();
  const handleComplete = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email as string);
      formData.append("userName", submittedData.userName);
      formData.append(
        "mainBackground",
        submittedData.mainBackground.toUpperCase()
      );
      formData.append("mainLp", submittedData.mainLp.toUpperCase());
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        //쿼리에 userId와 토큰을 넣어서 메인페이지로 이동
        setUserInfo({
          ...userInfo,
          email: response.data.userInfo.email as string,
          userId: response.data.userInfo.userId,
          userName: response.data.userInfo.userName,
          mainBackground: response.data.userInfo.mainBackground.toLowerCase(),
          mainLp: response.data.userInfo.mainLp.toLowerCase(),
        });

        console.log(userInfo);

        router.push({
          pathname: `/main/${response.data.userInfo.userId}`,
          // query: {
          //   userId: response.data.userInfo.userId,
          // },
        });
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data);
        //이미 가입된 사용자입니다. 임시노출
        alert("이미 가입된 사용자입니다.");
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center z-10  p-2 font-pretendard font-semibold ">
      <div className="relative max-w-[300px] max-h-[630px] max-auto p-1">
        <img
          src={infoSvg.mainBackground[submittedData.mainBackground]}
          alt="preview-background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            className="transform -translate-x-1/2 -translate-y-1/2 rotate-infinite mt-10 w-[230px] h-[230px]"
            src={infoSvg.mainLp[submittedData.mainLp]}
            alt="preview-lpDesign"
          />
        </div>

        <img
          src={tapButton[`tap-${submittedData.mainBackground}`]}
          alt="tap-button"
          className="w-[100px] h-[100px] absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce "
        />

        <Image
          src={pin}
          alt="lp-pin"
          className="absolute top-[40%] left-[65%] w-[100px] h-[160px]"
        />
      </div>
      <div
        className="flex w-full h-full max-w-sm items-center justify-center mx-auto gap-4
      "
      >
        <button
          className="bg-[#E2E2E2] text-black w-40 max-w-[140px] p-2 rounded font-pretendard"
          onClick={onPrevious}
        >
          이전
        </button>

        <button
          className="bg-black text-white w-40 max-w-[140px] p-2 rounded font-pretendard"
          onClick={handleComplete}
          type="button"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PreivewInfo;
