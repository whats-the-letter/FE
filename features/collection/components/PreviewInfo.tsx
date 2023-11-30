import React from "react";

interface PreivewInfoProps {
  submittedData: {
    nickname: string;
    lpBackground: string;
    lpDesign: string;
  };
  infoSvg: {
    lpBackground: Record<string, string>;
    lpDesign: Record<string, string>;
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
  return (
    <div
      className="flex flex-col w-full h-full items-center justify-center m-auto p-4 gap-2
     "
    >
      <div className="relative max-w-[270px] max-h-[600px] mx-auto">
        <img
          className="w-full h-full object-cover "
          src={infoSvg.lpBackground[submittedData.lpBackground]}
          alt="preview-background"
        />

        <img
          className="absolute top-1/3 left-5 w-[230px] h-[230px] rotate-infinite"
          src={infoSvg.lpDesign[submittedData.lpDesign]}
          alt="preview-lpDesign"
        />
        <img
          src={tapButton[`tap-${submittedData.lpBackground}`]}
          alt="tap-button"
          className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce w-[90px] h-[90px]
          "
        />
        <img
          src="/assets/lp/lp-pin.svg"
          alt="lp-pin"
          className="absolute top-[40%] left-[65%] w-[100px] h-[160px]"
        />
        <img
          className="absolute top-[63%] left-[8%] w-[90px] h-[90px]"
          src={playListButton[`playlist-${submittedData.lpBackground}`]}
          alt="playlist"
        />
      </div>
      <div
        className="flex w-full h-full max-w-sm items-center justify-center mx-auto gap-4
      "
      >
        <button
          className="bg-[#E2E2E2] text-black w-full max-w-[140px] p-2 rounded font-pretendard"
          onClick={onPrevious}
        >
          이전
        </button>
        <button
          className="bg-black text-white w-full max-w-[140px] p-2 rounded font-pretendard"
          onClick={onComplete}
          type="submit"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default PreivewInfo;
