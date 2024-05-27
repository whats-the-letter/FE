import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../features/components/units/Sidebar";
import Image from "next/image";
import menu from "../../features/assets/icons/menu.svg";
import axios from "axios";
import useGetToken from "@/hooks/useGetToken";
import useUserInfoStore from "@/store/useUserInfoStore";

export interface CollectionProps {
  albumInfoList: AlbumInfoList[];
}

export interface AlbumInfoList {
  albumBackground: string;
  albumCover: string;
  albumId: string;
  albumPhrases: string;
  backImage: string;
  fromName: string;
  frontImage: string;
  letter: string;
  musicArtist: string;
  musicName: string;
  tags: string[];
  toName: string;
  youtubeUrlId: string;
}

const Collection: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [albums, setAlbums] = useState<AlbumInfoList[]>([]);
  const { token, refreshAccessToken } = useGetToken();
  const { userInfo, setUserInfo } = useUserInfoStore();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (token.accessToken && userInfo.userId) {
      console.log(token.accessToken);
      console.log(userInfo.userId);
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/album/collection`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        })
        .then((res) => {
          setAlbums(res.data.albumInfoList);
          console.log(res.data.albumInfoList);
        })
        .catch(async (err) => {
          if (err.response.status === 401) {
            await refreshAccessToken();
            axios
              .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/album/collection`, {
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              })
              .then((res) => {
                setAlbums(res.data.albumInfoList);
                console.log(res.data.albumInfoList);
              })
              .catch((error) => console.log(error));
          } else {
            console.log(err);
          }
        });
    }
  }, [token.accessToken, refreshAccessToken, userInfo.userId]);

  return (
    <>
      <div className="flex flex-col w-full max-w-sm h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard font-semibold ">
        <div className="flex justify-start items-center w-full">
          <button type="button" onClick={toggleSidebar}>
            <Image src={menu} width={24} height={24} alt="menu" />
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <span>나의 컬렉션 </span>
          <span>
            총 <strong>{albums.length}</strong>개
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {albums.map((album) => (
            <div
              key={album.albumId}
              className="flex flex-col items-center justify-center w-full h-full bg-gray-200 rounded-md"
            >
              <Image
                src={album.albumCover}
                width={200}
                height={200}
                alt="albumCover"
              />
              <span>{album.musicName}</span>
              <span>{album.musicArtist}</span>
              <span>{album.fromName}</span>
              <span>{album.toName}</span>
              <span>{album.albumPhrases}</span>
              <span>{album.letter}</span>
            </div>
          ))}
        </div>
        <Link href="/newalbum">
          <button
            type="button"
            className="bg-black rounded-md text-center w-64 h-10 p-2 m-auto items-center text-white text-sm "
          >
            <span>나도 앨범 보내기</span>
          </button>
        </Link>
      </div>
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};

export default Collection;
