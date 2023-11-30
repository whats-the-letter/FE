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
    <div>
      <div className="relative -z-10">{backSelection[submittedAlbum.back]}</div>
      <div className="flex flex-col items-center justify-center w-full h-full z-10 max-w-sm max-h-sm m-auto font-pretendard space-y-6">
        <span className="w-full text-lg text-center z-10 mb-8">
          앨범이 완성되었습니다!
        </span>

        <span className="z-10 w-full text-left ml-10">
          To. <strong>{submittedAlbum.to}</strong>
        </span>

        <div
          className="z-10 relative cursor-pointer perspective-500 h-[280px] w-[280px]"
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

        <span className="text-right z-10 w-full mr-10">
          From. <strong>{submittedAlbum.from}</strong>
        </span>

        <span className="text-center text-gray-400 text-sm font-normal z-10 w-full max-w-sm m-auto">
          앨범을 클릭하여 뒷면을 확인하세요!
        </span>

        <button className="bg-black text-white w-full max-w-sm h-9 rounded z-10 m-auto ">
          <span className="text-sm">보내기</span>
        </button>
      </div>
    </div>
  );
};

export default CompleteAlbum;
