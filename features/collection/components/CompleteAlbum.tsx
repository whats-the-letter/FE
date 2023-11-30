import React, { useState } from "react";
import {
  albumSelection,
  letterSelection,
  phrasesSelection,
} from "../../utils/data";
import BackgroundColorful from "./BackSelect-Animation/BackgroundColorful";
import BackgroundSnow from "./BackSelect-Animation/BackgroundSnow";
import BackgroundCircles from "./BackSelect-Animation/BackgroundCircles";

interface CompletedAlbumProps {
  submittedAlbum: {
    editor: string;
    phrases: string;
    back: string;
    music: string;
    letter: string;
    to: string;
    from: string;
  };
}

const backSelection = {
  colorful: <BackgroundColorful />,
  snow: <BackgroundSnow />,
  circles: <BackgroundCircles />,
};

const CompleteAlbum: React.FC<CompletedAlbumProps> = ({ submittedAlbum }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center font-pretendard gap-2">
      <span className="text-lg text-center w-full  z-10 my-6">
        앨범이 완성되었습니다!
      </span>
      <span className="text-left w-full font-pretendard z-10">
        To. {submittedAlbum.to}
      </span>
      <div className="relative -z-10 ">
        {backSelection[submittedAlbum.back]}
      </div>
      <div
        className="z-10 relative cursor-pointer perspective-500 w-[300px] h-[300px]"
        onClick={handleCardClick}
      >
        <div className={`card ${isFlipped ? "flipped" : ""}`}>
          <div className="card-front z-10">
            <img src={albumSelection[submittedAlbum.editor]} alt="editor" />
            <img
              src={phrasesSelection[submittedAlbum.phrases]}
              className="absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              alt="phrases"
            />
          </div>
          <div className="card-back">
            <img src={letterSelection[`${submittedAlbum.editor}-letter`]} />
            <div className="flex justify-center items-center text-[12px] absolute w-full h-full max-w-[200px] max-h-[200px]">
              {submittedAlbum.letter}
            </div>
          </div>
        </div>
      </div>
      <span className="text-right w-full z-10">
        From. {submittedAlbum.from}
      </span>
      <span className="text-center w-full text-gray-400 text-sm font-normal z-10 my-6
      ">
        편지를 클릭하며 뒷면을 확인하세요!
      </span>
    </div>
  );
};

export default CompleteAlbum;
