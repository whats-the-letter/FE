import axios from "axios";
import { useEffect, useState } from "react";

const MusicList = ({ playListSelection }) => {
  const [videoData, setVideoData] = useState(null);

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
    if (playListSelection.length > 0) {
      fetchVideoData(playListSelection[0].youtubeUrlId);
    }
  }, [playListSelection]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <span className="text-xl font-pretendard text-center font-bold">
        음악을 선택해 주세요
      </span>

      {playListSelection.map((item) => (
        <div key={item.id} className="flex items-center w-full h-full gap-10">
          <img src="/assets/icons/unselected_music.svg" alt="music" />
          <iframe
            width="100"
            height="100"
            src={`https://www.youtube.com/embed/${item.youtubeUrlId}`}
            title={item.name}
            allowFullScreen
          ></iframe>
          <div className="flex-grow flex flex-col items-start justify-start font-pretendard ">
            <h2>{item.name}</h2>
            <h2 className="text-custom_gray">{item.artist}</h2>
          </div>
          <img
            src="/assets/icons/play_button.svg"
            alt="plus"
            className="w-8 h-8"
          />
        </div>
      ))}
    </div>
  );
};

export default MusicList;
