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
      className="flex w-full h-full items-center justify-center max-w-[375px] max-h-[812px] mx-auto
     "
    >
      <div className="relative max-w-[270px] max-h-[700px] mx-auto">
        <img
          className="w-full h-full object-cover border-2 border"
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
      <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="bg-black text-white w-full px-4 py-2 rounded"
          onClick={onPrevious}
        >
          이전
        </button>
        <button
          className="bg-black text-white w-full px-4 py-2 rounded"
          onClick={onComplete}
          type="submit"
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default PreivewInfo;
