import { UserInfo } from "@/types";
import { create } from "zustand";

export type UserInfoStoreProps = {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};

const useUserInfoStore = create<UserInfoStoreProps>((set) => ({
  userInfo: {
    userId: "",
    userName: "",
    email: "",
    mainBackground: "",
    mainLp: "",
    playlist: [],
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
