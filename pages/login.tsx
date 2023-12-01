import React from "react";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard">
        <img src="/assets/main/main-logo.svg" alt="logo" />
        <h1 className="text-xl font-semibold"> 로그인이 필요한 서비스입니다.</h1>
        <div className="flex flex-col items-center justify-center z-10 py-3 font-normal text-sm text-center space-y-0.5">
          <span>Dear New Year을 찾아주셔서 감사합니다.</span>
          <span>서비스 이용을 위해서는 로그인이 필요합니다.</span>
          <span>로그인 후 다양한 서비스를 이용해보세요!</span>
        </div>

        <button className="bg-[#FAE100] rounded-md text-center w-full max-w-sm h-10 p-2 px-4 flex items-center">
          <img src="/assets/icons/kakao.svg" alt="kakao" />
          <p className="text-center text-[#371D1E] text-base m-auto font-pretendard font-semibold">
            카카오로 시작하기
          </p>
        </button>
      </div>
    </>
  );
}
