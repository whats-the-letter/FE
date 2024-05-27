import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../features/components/units/Sidebar";
import Image from "next/image";
import menu from "../../features/assets/icons/menu.svg";
import axios from "axios";
import useGetToken from "@/hooks/useGetToken";
import useUserInfoStore from "@/store/useUserInfoStore";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/units/Loading";
import { changeCover, changePhrase } from "@/utils/changeAssets";
import { albumSelection, phrasesSelection } from "@/utils/data";
import lp from "../../features/assets/icons/lp.svg";
import { useRouter } from "next/router";
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

const fetchAlbums = async (userId: string) => {
  const token = localStorage.getItem("accessToken");

  // userId를 사용하는 방식에 따라 URL에 userId를 포함시킬 수도 있습니다.
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/album/collection`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.albumInfoList;
};

const Collection: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { userInfo } = useUserInfoStore();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const {
    data: albums,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["albumInfo", userInfo.userId],
    queryFn: () => fetchAlbums(userInfo.userId),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error...</div>;

  return (
    <>
      <div className="flex flex-col w-full max-w-sm h-screen items-center justify-center z-10 m-auto p-3 space-y-10 font-pretendard font-semibold ">
        <div className="flex justify-start items-center w-full">
          <button type="button" onClick={toggleSidebar}>
            <Image src={menu} width={24} height={24} alt="menu" />
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <span>나의 컬렉션 </span>
            <br />
            <span className="text-[10px] text-custom_gray">
              * 저장되지 않은 컬렉션은 7일 뒤에 사라져요!
            </span>
          </div>
          <span>
            총 <strong>{albums.length}</strong>개
          </span>
        </div>
        <div
          className="grid grid-cols-2 overflow-y-auto w-full h-[480px]
        "
        >
          {albums.map((album: AlbumInfoList) => (
            <div
              key={album.albumId}
              className="flex flex-col items-center justify-center w-full h-full p-2 m-auto"
            >
              <div
                onClick={() => {
                  router.push(`/newalbum/${album.albumId}`);
                }}
                className="w-full h-full p-2 cursor-pointer hover:scale-105 transform
                 transition duration-300 ease-in-out"
              >
                <div className="z-20 relative cursor-pointer perspective-500 h-[120px] w-[120px]">
                  <img
                    src={albumSelection[changeCover(album.albumCover)]}
                    alt="albumCover"
                  />
                  <Image
                    src={lp}
                    alt="lp"
                    className=" z-[-10] w-[120px] h-[120px] absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2"
                  />

                  <img
                    src={phrasesSelection[changePhrase(album.albumPhrases)]}
                    className="absolute top-[23%] left-[40%] transform -translate-x-1/2 -translate-y-1/2"
                    alt="phrases"
                    width={80}
                    height={12}
                  />

                  <div className=" absolute top-[91.2%] left-2/3 transform -translate-x-1/2 -translate-y-1/2 flex text-[4px]">
                    <span className="truncate inline-block text-center whitespace-nowrap overflow-hidden text-ellipsis">
                      <strong>{album.musicName}</strong>-
                      <strong> {album.musicArtist}</strong>
                    </span>
                  </div>

                  <img
                    className="absolute top-[61%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[60px]"
                    src={`https://i1.ytimg.com/vi/${album.youtubeUrlId}/maxresdefault.jpg`}
                    alt="music-thumbnail"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
        className="w-full"
        href="/newalbum">
          <button
            type="button"
            className="bg-black rounded-md text-center w-full h-10 p-2 m-auto items-center text-white text-sm "
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
