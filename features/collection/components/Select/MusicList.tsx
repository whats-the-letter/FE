import React, { useState } from "react";

interface MusicListProps {
  musicList: string[];
  selectedMusic: string;
  onMusicPlay: (music: string) => void;
}

const PLAYLIST_ID = "PL5tS7iF1ZPgakzmZ9mGPqTyxX9Ai4XGNd";

const MusicList: React.FC<MusicListProps> = ({
  musicList,
  selectedMusic,
  onMusicPlay,
}) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
    onMusicPlay(selectedMusic);
  };

  return (
    <>
      <span>추천 받기</span>
      <div className="flex flex-col justify-center items-center space-y-10 my-10 z-10">
        {musicList.map((music, index) => (
          <button key={index} onClick={() => onMusicPlay(music)}>
            {music}
          </button>
        ))}
      </div>
      {isVideoPlaying && (
        <div onClick={handleVideoClick}>
          <iframe
            width="200"
            height="200"
            className="rounded-full"
            src={`https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&index=${
              musicList.indexOf(selectedMusic) + 1
            }`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </>
  );
};

export default MusicList;
