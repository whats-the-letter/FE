import React from "react";

export default function Page() {
  return (
    <>
      <img
        src="/assets/mobile.svg"
        alt="background"
        className="z-[-1] absolute w-screen object-fill"
      />
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 p-4 px-10 ">
        <img src="/assets/logo/main-logo.svg" alt="logo" />
        <span className=" text-center">
          연말 연시 감사인사를 전할 사람을 위해 <br /> 앨범을 제작하고 추천곡을
          담아 보내보세요. <br /> 이번 푸른 용의 해에는 특별한 방식으로 <br />
          마음을 전달해보는 건 어떨까요?
        </span>
        <button className="bg-[#FAE100] rounded-md text-center w-full max-w-sm h-10 p-2 px-4 flex items-center">
          <img src="/assets/icons/kakao.svg" alt="kakao" />
          <p className="text-center text-[371D1E] text-base m-auto">
            카카오로 시작하기
          </p>
        </button>
      </div>
    </>
  );
}
