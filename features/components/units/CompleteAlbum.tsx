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
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import BackgroundBack from "./BackSelect-Animation/BackgroundBack";
import useGetToken from "@/hooks/useGetToken";

export interface AlbumInfo {
  albumBackground: string;
  albumCover: string;
  albumPhrases: string;
  fromName: string;
  letter: string;
  music: string;
  toName: string;
}

const backSelection: Record<string, React.JSX.Element> = {
  colorful: <BackgroundColorful />,
  particles: <BackgroundBack />,
  circles: <BackgroundCircles />,
};

const CompleteAlbum: React.FC<{
  submittedAlbum: AlbumInfo;
  selectedMusic: MusicProps;
}> = ({ submittedAlbum, selectedMusic }) => {
  const router = useRouter();
  const { handleSubmit } = useFormContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const { open } = useModal({
    title: "공유하기",
    description: "* 공유를 하지 않으면 앨범은 영영 닿지 못할 거예요.",
    showCloseBtn: true,
  });

  const { token, refreshAccessToken } = useGetToken();

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const onClickModal = async () => {
    open();
  };

  const determinePhrase = (albumPhrases: string) => {
    switch (albumPhrases) {
      case "editor-1":
        return "HBD";
      case "editor-2":
        return "HEALTH";
      case "editor-3":
        return "LOVE";
      case "editor-4":
        return "MONEY";
      case "editor-5":
        return "SUCCESS";
      default:
        return "PARENTS";
    }
  };

  const sendAlbumData = async () => {
    try {
      const formData = new FormData();
      formData.append(
        "albumBackground",
        submittedAlbum.albumBackground.toUpperCase()
      );
      formData.append(
        "albumCover",
        submittedAlbum.albumCover.toUpperCase().split("-")[1]
      );
      formData.append(
        "albumPhrases",
        determinePhrase(submittedAlbum.albumPhrases)
      );
      formData.append("fromName", submittedAlbum.fromName);
      formData.append("letter", submittedAlbum.letter);
      formData.append("musicId", submittedAlbum.music);
      formData.append("toName", submittedAlbum.toName);
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const refreshAccessToken = async () => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
          {
            refreshToken: token.refreshToken,
          }
        );

        const newToken = response.data;
        localStorage.setItem("token", JSON.stringify(newToken));
        token.accessToken = newToken.accessToken;
        token.expiresAt = newToken.expiresAt;
      };

      const accessToken = token.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      if (accessToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/send`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        if (response.status === 200) {
          console.log("앨범 전송 성공");
        }
      }
    } catch (error: any) {
      console.error(error);
      console.log(error);
      if (error.response.status === 401) {
        console.log("401에러");
        await refreshAccessToken();
        sendAlbumData();
      }
    }
  };

  const onSubmit = async () => {
    await sendAlbumData();
    onClickModal();

    //router.push("/newalbum/submit")
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
          onClick={onSubmit}
          className="bg-black text-white w-full max-w-sm h-9 rounded z-10 m-auto "
        >
          <span className="text-sm">보내기</span>
        </button>
      </div>
    </div>
  );
};

export default CompleteAlbum;
