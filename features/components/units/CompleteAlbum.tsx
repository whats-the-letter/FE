import React, { useEffect, useState } from "react";
import {
  albumSelection,
  letterSelection,
  phrasesSelection,
} from "../../utils/data";
import { useModal } from "../common/ShareModal";
import BackgroundColorful from "./BackSelect-Animation/BackgroundColorful";
import BackgroundSnow from "./BackSelect-Animation/BackgroundSnow";
import BackgroundCircles from "./BackSelect-Animation/BackgroundCircles";
import axios from "axios";
import { MusicProps } from "./Select/MusicList";
import Image from "next/image";
import letterBg from "/features/assets/letter/letter-bg.svg";

export interface AlbumInfo {
  albumBackground: string;
  albumCover: string;
  albumId: number;
  albumPhrases: string;
  fromName: string;
  letter: string;
  music: string;
  toName: string;
}

const backSelection: Record<string, React.JSX.Element> = {
  colorful: <BackgroundColorful />,
  snow: <BackgroundSnow />,
  circles: <BackgroundCircles />,
};

const CompleteAlbum: React.FC<{
  submittedAlbum: AlbumInfo;
  selectedMusic: MusicProps;
}> = ({ submittedAlbum, selectedMusic }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  const { open } = useModal({
    title: "공유하기",
    description: "* 공유를 하지 않으면 앨범은 영영 닿지 못할 거예요.",
    showCloseBtn: true,
  });

  const onClickModal = async () => {
    const result = await sendAlbumData();
    open();
  };

  const sendAlbumData = async () => {
    try {
      const localSession = localStorage.getItem("session");
      const session = localSession ? JSON.parse(localSession) : null;
      const accessToken = session?.accessToken;
      console.log("세션 액세스 토큰 잘 불러옴?", accessToken);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/album/send`,
        {
          albumInfo: submittedAlbum,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("앨범보내기 실패에러", err);
    }
  };

  return (
    <div>
      <div className="relative -z-10">
        {backSelection[submittedAlbum.albumBackground]}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full z-10 max-w-sm max-h-sm m-auto font-pretendard space-y-6">
        <span className="w-full text-lg text-center z-10 mb-8">
          앨범이 완성되었습니다!
        </span>

        <div
          className="z-10 relative cursor-pointer perspective-500 h-[288px] w-[288px]"
          onClick={handleCardClick}
        >
          <div className={`card ${isFlipped ? "flipped" : ""}`}>
            <div className="card-front z-10">
              <img src={albumSelection[submittedAlbum.albumCover]} />
              <img
                src={phrasesSelection[submittedAlbum.albumPhrases]}
                className="absolute top-[23%] left-[40%] transform -translate-x-1/2 -translate-y-1/2"
                alt="phrases"
              />
              <div className="w-36 absolute top-[91.2%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 flex text-[10px]">
                <span className="truncate inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis">
                  <strong>{selectedMusic?.musicName}</strong>-
                  <strong> {selectedMusic?.musicArtist}</strong>
                </span>
              </div>

              <img
                className="absolute top-[61%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[133px]"
                src={`https://i1.ytimg.com/vi/${selectedMusic?.youtubeUrlId}/maxresdefault.jpg`}
                alt="music-thumbnail"
              />
            </div>
            <div className="card-back">
              <span className="absolute top-6 left-8 z-10 w-full text-left text-[10px]">
                To. <strong>{submittedAlbum.toName}</strong>
              </span>
              <Image
                src={letterBg}
                alt="letterBg"
                className="absolute inset-0 w-full h-full z-0"
              />
              <img
                src={letterSelection[`${submittedAlbum.albumCover}-letter`]}
                className="z-30"
              />

              <div className="flex justify-center items-center text-[10px] absolute w-full h-full max-w-[200px] max-h-[200px] z-20">
                {submittedAlbum.letter}
              </div>
              <span
                className="absolute bottom-5 right-1/4
              text-right z-10 w-full text-[10px]" 
              >
                From. <strong>{submittedAlbum.fromName}</strong>
              </span>
            </div>
          </div>
        </div>

        <span className="text-center text-gray-400 text-sm font-normal z-10 w-full max-w-sm m-auto">
          앨범을 클릭하여 뒷면을 확인하세요!
        </span>

        <button
          onClick={onClickModal}
          className="bg-black text-white w-full max-w-sm h-9 rounded z-10 m-auto "
        >
          <span className="text-sm">보내기</span>
        </button>
      </div>
    </div>
  );
};

export default CompleteAlbum;
