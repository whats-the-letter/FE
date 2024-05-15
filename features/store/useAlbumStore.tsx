
import { create } from "zustand";

 interface AlbumStoreInfo {
  albumBackground: string;
  albumCover: string;
  albumPhrases: string;
  fromName: string;
  letter: string;
  music: string;
  musicArtist: string;
  musicName: string;
  youtubeUrlId: string;
  albumId: string;
  toName: string;
 }



export type AlbumStoreProps = {
  albumInfo: {
    albumBackground: string;
    albumCover: string;
    albumPhrases: string;
    fromName: string;
    letter: string;
    music: string;
    musicArtist: string;
    musicName: string;
    youtubeUrlId: string;
    albumId: string;
    toName: string;
  };
  setAlbumInfo: (albumInfo: AlbumStoreInfo) => void;
};

const useAlbumInfoStore = create<AlbumStoreProps>((set) => ({
  albumInfo: {
    albumBackground: "",
    albumCover: "",
    albumPhrases: "",
    fromName: "",
    letter: "",
    music: "",
    albumId: "",
    musicArtist: "",
    musicName: "",
    youtubeUrlId: "",
    toName: "",
  },
  setAlbumInfo: (albumInfo) => set({ albumInfo }),
}));

export default useAlbumInfoStore;
