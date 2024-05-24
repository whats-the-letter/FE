import React, { forwardRef, useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import emptyMusic from "@/assets/icons/empty_music.svg";
import selected from "@/assets/icons/selected_music.svg";
import unselectedMusic from "@/assets/icons/unselected_music.svg";
import playButton from "@/assets/icons/play_button.svg";
import stopButton from "@/assets/icons/stop.svg";
import SearchBar from "@/components/units/SearchBar";

export interface MusicListProps {
  musicList: MusicProps[];
  onMusicChange: (music: MusicProps[]) => void;
}

export interface MusicProps {
  musicArtist: string;
  musicId: string;
  musicName: string;
  tags: string[];
  youtubeUrlId: string;
}

//eslint-disable-next-line
const MusicList = forwardRef<HTMLInputElement, MusicListProps>(
  ({ onMusicChange }) => {
    const [musicData, setMusicData] = useState<MusicProps[]>([]);
    const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [searchResultList, setSearchResultList] = useState<MusicProps[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>("all");

    useEffect(() => {
      const getMusicData = async () => {
        try {
          const response: AxiosResponse<MusicListProps> = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/music/list`
          );

          if (response.status !== 200) {
            throw new Error("음악 목록 가져오기 실패");
          }

          const fetchedMusicData = response.data.musicList;
          if (fetchedMusicData.length > 0) {
            setMusicData(fetchedMusicData);
            setSelectedMusicId(fetchedMusicData[0].youtubeUrlId);
            setSearchResultList(fetchedMusicData);
          }
        } catch (error) {}
      };
      getMusicData();
    }, []);

    const handleSearch = (keyword: string) => {
      const filteredList = musicData.filter(
        (item) =>
          item.musicName.toLowerCase().includes(keyword.toLowerCase()) ||
          item.musicArtist.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResultList(filteredList);
    };
    const handleFilterChange = (filter: string) => {
      setSelectedFilter(filter);
      if (filter === "all") {
        setSearchResultList(musicData);
      } else {
        const filteredList = musicData.filter((item) =>
          item.tags.includes(filter.toUpperCase())
        );
        setSearchResultList(filteredList);
      }
    };

    const playMusic = async (youtubeUrlId: string) => {
      try {
        const videoId = youtubeUrlId;
        setIsPlaying(false);
        setSelectedMusicId(youtubeUrlId);

        const iframe = document.getElementById(
          "youtubePlayer"
        ) as HTMLIFrameElement;
        if (iframe) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&start=0.5`;
          iframe.classList.remove("hidden");
          
        }
      } catch (error) {
        console.error("음악 재생 실패", error);
      }
    };

    useEffect(() => {
      if (selectedMusicId) {
        playMusic(selectedMusicId);
      } else if (musicData.length > 0) {
        setSelectedMusicId(musicData[0].youtubeUrlId);
      }
    }, [selectedMusicId, musicData]);

    const handleMusicBoxClick = (musicId: string) => {
      const selectedMusic = musicData.find(
        (item) => item.youtubeUrlId === musicId
      );
      setSelectedMusicId(musicId);
      setIsPlaying(false);
      if (selectedMusic) {
        onMusicChange([selectedMusic]);
      }
    };

    const handlePlayButtonClick = () => {
      setIsPlaying(true);
    };

    if (!selectedMusicId || !musicData) {
      return <div>로딩 중...</div>;
    }

    const selectedVideos = musicData.find(
      (item) => item.youtubeUrlId === selectedMusicId
    );

    const thumbnailUrl = `https://i1.ytimg.com/vi/${selectedMusicId}/maxresdefault.jpg`;

    return (
      <>
        <div className="w-full space-y-4">
          <span className="text-lg text-center font-pretendard z-10 w-full">
            음악을 선택해주세요
          </span>

          <div className="w-full overflow-x-scroll flex gap-2 ">
            {["all", "love", "cheers", "birthday", "others"].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`py-1 px-3 rounded-full ${
                  selectedFilter === filter
                    ? "bg-black text-white"
                    : "border border-black text-black"
                }`}
              >
                {filter === "all" ? "all" : filter}
              </button>
            ))}
          </div>
          <SearchBar onSearch={handleSearch} />
          <div className="w-full h-[300px] overflow-y-scroll py-8 flex flex-col justify-start">
            {searchResultList.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full gap-5 px-2">
                <Image
                  src={emptyMusic}
                  alt="empty-music"
                  className="w-14 h-14 "
                />
                <p className="text-center text-custom_gray font-pretendard font-semibold mb-4">
                  찾으시는 노래가 없으신가요?
                  <br />
                  앨범을 완성한 후 새로운 노래를 추천해 주세요!
                </p>
              </div>
            ) : (
              searchResultList.map((item) => (
                <div
                  key={item.musicId}
                  className="flex w-full h-full py-2 hover:bg-gray-200 cursor-pointer px-2"
                  onClick={() => handleMusicBoxClick(item.youtubeUrlId)}
                >
                  <img
                    src={`https://i1.ytimg.com/vi/${item.youtubeUrlId}/maxresdefault.jpg`}
                    alt="thumbnail"
                    className="w-10 h-10 rounded mr-4"
                  />
                  <div className="text-left selection:w-[100px] flex-grow inline-block flex-col items-start justify-start font-pretendard whitespace-nowrap overflow-hidden truncate">
                    <h2 className="text-sm overflow-hidden overflow-ellipsis">
                      {item.musicName}
                    </h2>
                    <h2 className="text-custom_gray text-sm overflow-hidden overflow-ellipsis">
                      {item.musicArtist}
                    </h2>
                  </div>
                  {selectedMusicId === item.youtubeUrlId ? (
                    <Image
                      src={selected}
                      alt="selected-music"
                      className="w-4"
                    />
                  ) : (
                    <Image
                      src={unselectedMusic}
                      alt="unselected-music"
                      className="w-4"
                    />
                  )}
                </div>
              ))
            )}
          </div>

          {selectedVideos && (
            <div className="bg-black w-full h-16 flex flex-row justify-between items-center px-2">
              <img src={thumbnailUrl} alt="thumbnail" className="w-20 mr-4" />

              <div className="flex flex-col justify-start items-start w-40 overflow-hidden">
                <div
                  className={`w-fit marquee ${isPlaying ? "playing" : ""}`}
                  style={{
                    animation: isPlaying
                      ? "marequee 6s linear infinite"
                      : "none",
                    transform: isPlaying ? "translateX(0)" : "none",
                  }}
                >
                  <span className="text-white font-pretendard text-sm font-semibold">
                    {selectedVideos.musicName}
                  </span>
                </div>
                <span className="text-white font-pretendard text-center text-xs font-semibold">
                  {selectedVideos.musicArtist}
                </span>
              </div>

              <style jsx>{`
                @keyframes marequee {
                  0% {
                    -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
                  }
                  100% {
                    -webkit-transform: translate3d(-100%, 0, 0);
                    transform: translate3d(-100%, 0, 0);
                  }
                }

                .marequee {
                  overflow: hidden;
                  white-space: nowrap;
                  will-change: transform;
                }

                .marequee.playing {
                  animation: textloop 5s linear infinite;
                }

                .mareuqee:not(.playing) {
                  animation-play-state: paused;
                }
              `}</style>
              <button
                type="button"
                className="w-8 h-8 text-white this-button mx-2"
                onClick={handlePlayButtonClick}
              >
                <Image src={playButton} alt="play-button" className="w-3" />
              </button>
              <button
                type="button"
                className="text-white mr-4"
                onClick={() => setIsPlaying(false)}
              >
                <Image src={stopButton} alt="close" className="w-3" />
              </button>
            </div>
          )}

          {isPlaying && (
            <iframe
              className="hidden"
              width="0"
              height="0"
              src={`https://www.youtube.com/embed/${selectedMusicId}?autoplay=1&start=0.5`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>
      </>
    );
  }
);

export default MusicList;
