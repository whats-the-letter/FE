import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicList from "../features/collection/components/MusicList";

export default function Page() {
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [musicList, setMusicList] = useState<string[]>([]);

  const handleMusicPlay = (music: string) => {
    setSelectedMusic(music);
  };

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const musicSelection = await fetchMusicSelection();
        setMusicList(musicSelection);
      } catch (error) {
        console.error("음악 목록을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchMusic();
  }, []);

  const fetchMusicSelection = async () => {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = "PL5tS7iF1ZPgakzmZ9mGPqTyxX9Ai4XGNd";

    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const musicSelection = response.data.items.map(
        (item) => item.snippet.title
      );
      return musicSelection;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm">
      <MusicList
        musicList={musicList}
        selectedMusic={selectedMusic}
        onMusicPlay={handleMusicPlay}
      />
    </div>
  );
}
