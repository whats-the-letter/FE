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
import { useRouter } from "next/router";
import { changeCover, changePhrase } from "@/utils/changeAssets";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/units/Loading";

const backSelection: Record<string, React.JSX.Element> = {
  colorful: <BackgroundColorful />,
  particles: <BackgroundBack />,
  circles: <BackgroundCircles />,
};

const ViewAlbum: React.FC = () => {
  const router = useRouter();
  const { userInfo } = useUserInfoStore();
  const { setAlbumInfo } = useAlbumInfoStore();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const {
    data: albumInfo,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["albumInfo", router.query.id],
    async () => {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/view/${router.query.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.albumInfo;
    },
    {
      enabled: false,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 5,
      onSuccess: (data) => {
        setAlbumInfo(data);
      },
    }
  );

  useEffect(() => {
    if (!userInfo.userId) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      router.push(`/login`);
    } else {
      refetch();
    }
  }, [userInfo.userId, router, refetch]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching album information</div>;
  }

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
                      src={
                        letterSelection[
                          `${changeCover(albumInfo.albumCover)}-letter`
                        ]
                      }
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
              <button
                onClick={() => router.push("/newalbum")}
                className="bg-black text-white w-full  py-2 rounded-md z-10"
              >
                <span className="text-sm">나도 앨범 보내기</span>
              </button>

              <div id="youtubePlayer">
                <iframe
                  width="0"
                  height="0"
                  src={`https://www.youtube.com/embed/${albumInfo.youtubeUrlId}?autoplay=1&start=0.5`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAlbum;
