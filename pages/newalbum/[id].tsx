import React, { useEffect, useState } from "react";
import axios from "axios";
import useAlbumInfoStore from "@/store/useAlbumStore";
import useUserInfoStore from "@/store/useUserInfoStore";
import BackgroundColorful from "@/components/units/BackSelect-Animation/BackgroundColorful";
import BackgroundBack from "@/components/units/BackSelect-Animation/BackgroundBack";
import BackgroundCircles from "@/components/units/BackSelect-Animation/BackgroundCircles";
import {
  albumSelection,
  letterSelection,
  phrasesSelection,
} from "@/utils/data";
import Image from "next/image";
import letterBg from "/features/assets/letter/letter-bg.svg";

const backSelection: Record<string, React.JSX.Element> = {
  colorful: <BackgroundColorful />,
  particles: <BackgroundBack />,
  circles: <BackgroundCircles />,
};

const ViewAlbum = () => {
  const { userInfo } = useUserInfoStore();
  const { albumInfo, setAlbumInfo } = useAlbumInfoStore();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const changePhrase = (albumPhrases: string) => {
    switch (albumPhrases) {
      case "HBD":
        return "editor-1";
      case "HEALTH":
        return "editor-2";
      case "LOVE":
        return "editor-3";
      case "MONEY":
        return "editor-4";
      case "SUCCESS":
        return "editor-5";
      default:
        return;
    }
  };

  const changeCover = (albumCover: string) => {
    switch (albumCover) {
      case "LOVE":
        return "editor-love";
      case "MONEY":
        return "editor-money";
      case "SUCCESS":
        return "editor-success";
      case "HEALTH":
        return "editor-health";
      default:
        return;
    }
  };

  useEffect(() => {
    // 로컬 스토리지에서 앨범 정보를 불러오는 로직
    const loadAlbumInfoFromLocalStorage = () => {
      const loadAlbumInfo = localStorage.getItem("albumInfo");
      if (loadAlbumInfo) {
        setAlbumInfo(JSON.parse(loadAlbumInfo));
      }
    };

    // 앨범 정보를 가져와서 로컬 스토리지와 스토어에 저장하는 함수
    const fetchAndStoreAlbumInfo = () => {
      const token = localStorage.getItem("accessToken");
      const albumId = window.location.pathname.split("/")[2];

      if (token) {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/view/${albumId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              // 앨범 정보를 로컬 스토리지와 스토어에 저장
              localStorage.setItem(
                "albumInfo",
                JSON.stringify(res.data.albumInfo)
              );
              setAlbumInfo(res.data.albumInfo);
              console.log(albumInfo);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    loadAlbumInfoFromLocalStorage();
    fetchAndStoreAlbumInfo();
  }, [userInfo, setAlbumInfo]);

  return (
    <>
      {albumInfo && (
        <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm font-semibold">
          <div className="flex flex-col text-center justify-center items-center w-full max-w-sm px-8 z-10 font-pretendard ">
            <div className="relative -z-10">
              {backSelection[albumInfo.albumBackground.toLowerCase()]}
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full z-10 max-w-sm max-h-sm m-auto font-pretendard space-y-6">
              <div
                className="z-10 relative cursor-pointer perspective-500 h-[288px] w-[288px]"
                onClick={handleCardClick}
              >
                <div className={`card ${isFlipped ? "flipped" : ""}`}>
                  <div className="card-front z-10">
                    <img
                      src={albumSelection[changeCover(albumInfo.albumCover)]}
                      alt="albumCover"
                    />
                    <img
                      src={
                        phrasesSelection[changePhrase(albumInfo.albumPhrases)]
                      }
                      className="absolute top-[23%] left-[40%] transform -translate-x-1/2 -translate-y-1/2"
                      alt="phrases"
                    />
                    <div className="w-36 absolute top-[91.2%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 flex text-[10px]">
                      <span className="truncate inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis">
                        <strong>{albumInfo.musicName}</strong>-
                        <strong> {albumInfo.musicArtist}</strong>
                      </span>
                    </div>

                    <img
                      className="absolute top-[61%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[240px] h-[133px]"
                      src={`https://i1.ytimg.com/vi/${albumInfo.youtubeUrlId}/maxresdefault.jpg`}
                      alt="music-thumbnail"
                    />
                  </div>
                  <div className="card-back">
                    <span className="absolute top-6 left-8 z-10 w-full text-left text-[10px]">
                      To. <strong>{albumInfo.toName}</strong>
                    </span>
                    <Image
                      src={letterBg}
                      alt="letterBg"
                      className="absolute inset-0 w-full h-full z-0"
                    />
                    <img
                      src={letterSelection[`${changeCover(albumInfo.albumCover)}-letter`]}
                      className="z-30"
                    />

                    <div className="flex justify-center items-center text-[10px] absolute w-full h-full max-w-[200px] max-h-[200px] z-20">
                      {albumInfo.letter}
                    </div>
                    <span
                      className="absolute bottom-5 right-1/4
              text-right z-10 w-full text-[10px]"
                    >
                      From. <strong>{albumInfo.fromName}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-center text-gray-400 text-sm font-normal z-10 w-full max-w-sm m-auto">
                앨범을 클릭하여 뒷면을 확인하세요!
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAlbum;
