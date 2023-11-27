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
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm space-y-4">
      <div>
        <img
          className="w-full h-full object-cover"
          src={infoSvg.lpBackground[submittedData.lpBackground]}
          alt="preview-background"
        />

        <img
          className="absolute top-[34%] left-[7%] animate-spin"
          src={infoSvg.lpDesign[submittedData.lpDesign]}
          alt="preview-lpDesign"
        />
        <img
          src={tapButton[`tap-${submittedData.lpBackground}`]}
          alt="tap-button"
          className="absolute top-[37%] left-[60%] animate-bounce"
        />
        <img
          src="/assets/lp/lp-pin.svg"
          alt="lp-pin"
          className="absolute top-[40%] left-[74%]"
        />
        <img
          className="absolute top-[69%] left-[8%]"
          src={playListButton[`playlist-${submittedData.lpBackground}`]}
          alt="playlist"
        />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={onPrevious}
        >
          이전
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded"
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
