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

  const videoTitle = videoData.snippet.title;
  const videoThumbnail = videoData.snippet.thumbnails.high.url;

  return (
    <div>
      {playListSelection.map((item) => (
        <div key={item.id}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${item.youtubeUrlId}`}
            title={videoTitle}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <img
            src={videoThumbnail}
            alt={videoTitle}
            className="w-[40px] h-[40x]"
          />
          <h2>{videoTitle}</h2>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
