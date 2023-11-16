import React, { useEffect, useState } from "react";
import axios from "axios";

const MusicList = ({ playListSelection }) => {
  const [videoData, setVideoData] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

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

            <img
              src="/assets/icons/play_button.svg"
              alt="play-button"
              className="w-8 h-8"
            />
          </div>
        ))}
      </div>
      <div className="bg-black w-full h-16 flex flex-row justify-between items-center px-2">
        <iframe
          width="80"
          height="40"
          src={`https://www.youtube.com/embed/${selectedVideoId}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
        <div className="flex flex-col justify-start items-start w-40">
          <span className="text-white font-pretendard text-center text-sm">
            {selectedVideo.name}
          </span>
          <span className="text-white font-pretendard text-center text-xs">
            {selectedVideo.artist}
          </span>
        </div>
        <button className="text-white" onClick={() => setSelectedVideoId(null)}>
          <img src="/assets/icons/close.svg" alt="close" className="w-5" />
        </button>
      </div>
    </>
  );
};

export default MusicList;
