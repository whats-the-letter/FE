import React, { useEffect, useState } from "react";
import axios from "axios";

const MusicList = ({ playListSelection }) => {
  const [videoData, setVideoData] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchVideoData = async (videoId) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet`
      );
      setVideoData(response.data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  useEffect(() => {
    if (selectedVideoId) {
      fetchVideoData(selectedVideoId);
    } else if (playListSelection.length > 0) {
      setSelectedVideoId(playListSelection[0].youtubeUrlId);
    }
  }, [selectedVideoId, playListSelection]);

  const handleMusicBoxClick = (videoId) => {
    setSelectedVideoId(videoId);
    setIsPlaying(false);
  };

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };

  if (!selectedVideoId || !videoData) {
    return null;
  }
  const selectedVideo = playListSelection.find(
    (item) => item.youtubeUrlId === selectedVideoId
  );

  return (
    <>
      <span className="text-lg text-center font-pretendard z-10">
        음악을 선택해주세요
      </span>
      <button className="bg-black text-white w-16 h-8 rounded-full">
        <span className="text-sm">재물</span>
      </button>

      <div className="w-full h-80 overflow-y-scroll">
        {playListSelection.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 items-center w-full h-[70px] hover:bg-gray-200 cursor-pointer px-2"
            onClick={() => handleMusicBoxClick(item.youtubeUrlId)}
          >
            {selectedVideoId === item.youtubeUrlId ? (
              <img
                src="/assets/icons/selected_music.svg"
                alt="selected-music"
                className="w-4"
              />
            ) : (
              <img
                src="/assets/icons/unselected_music.svg"
                alt="unselected-music"
                className="w-4"
              />
            )}
            <div className="flex flex-grow items-center justify-between">
              <img src={item.thumbnail} alt="thumbnail" className="w-12 h-12" />
              <div className="flex-grow flex flex-col items-start justify-start font-pretendard mx-8">
                <h2 className="text-sm">{item.name}</h2>
                <h2 className="text-custom_gray text-sm">{item.artist}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black w-full h-16 flex flex-row justify-between items-center px-2">
        <img
          src={selectedVideo.thumbnail}
          alt="thumbnail"
          className="w-9 mr-4"
        />
        <div className="flex flex-col justify-start items-start w-40 overflow-hidden">
          <div
            className={`w-fit marquee ${isPlaying ? "playing" : ""}`}
            style={{
              animation: isPlaying ? "marequee 6s linear infinite" : "none",
              transform: isPlaying ? "translateX(0)" : "none",
            }}
          >
            <span className="text-white font-pretendard text-sm">
              {selectedVideo.name}
            </span>
          </div>
          <span className="text-white font-pretendard text-center text-xs">
            {selectedVideo.artist}
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
          <img
            src="/assets/icons/play_button.svg"
            alt="play-button"
            className="w-3"
          />
        </button>
        <button
          type="button"
          className="text-white mr-4"
          onClick={() => setIsPlaying(false)}
        >
          <img
            src="/assets/icons/stop_button.svg"
            alt="close"
            className="w-3"
          />
        </button>
      </div>

      {isPlaying && (
        <iframe
          className="hidden"
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&start=0.5`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </>
  );
};

export default MusicList;
