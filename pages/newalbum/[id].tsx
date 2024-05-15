import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useAlbumInfoStore from "@/store/useAlbumStore";

const ViewAlbum = () => {
  const router = useRouter();
  const { albumId } = router.query;
  const setAlbumInfo = useAlbumInfoStore((state) => state.setAlbumInfo);
  const albumData = useAlbumInfoStore((state) => state.albumInfo);

  const fetchAlbumData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/view/${albumId}`
      );
      setAlbumInfo(response.data.albumInfo);
      console.log(response.data.albumInfo); // 서버로부터 받은 데이터로 상태 업데이트
    } catch (error) {
      console.error("앨범 데이터를 불러오는 중 에러가 발생했습니다.", error);
      router.push("/"); // 에러 발생 시 홈으로 리디렉션
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []); // albumId가 변경될 때마다 함수 실행

  if (!albumData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="album-page">
      <h1>앨범 보기: {albumData.toName}</h1>
      <div>
        <p>{albumData.letter}</p>
      </div>
      <div>
        <h2>From: {albumData.fromName}</h2>
        <p>Background: {albumData.albumBackground}</p>
        <p>Cover: {albumData.albumCover}</p>
        <p>Phrases: {albumData.albumPhrases}</p>
        <p>Music: {albumData.music}</p>
      </div>
    </div>
  );
};

export default ViewAlbum;
