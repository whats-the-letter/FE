export default function Home() {
  return (
    <>
      <div className="flex flex-col flex-1 w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 gap-10 ">
        <div>
          <img src="/assets/main/main-logo.svg" alt="logo" />
          <span className="flex flex-col items-center justify-center z-10 font-pretendard font-semibold text-sm text-center space-y-0.5 mt-12">
            What&apos;s The Letter?과 함께 <br />
            앨범을 제작하고 추천곡을 담아 보내요!
            <br />
            소중한 사람에게 오늘은 특별한 방식으로
            <br />
            마음을 전달해보는 건 어떨까요?
            <br />
          </span>
          <p className="text-custom_gray text-[10px] mt-4">
            * 이벤트 한정시즌에는 새로운 앨범이 기다리고 있을지도 몰라요!
          </p>
        </div>
        <button
          className="bg-[#FAE100]  
          rounded-md text-center w-64 max-w-sm h-10 p-2 px-4 flex items-center"
        >
          <img src="/assets/icons/kakao.svg" alt="kakao" />

          <p className="text-center text-[#371D1E] text-base m-auto font-pretendard font-semibold">
            카카오로 시작하기
          </p>
        </button>
      </div>
    </>
  );
}
