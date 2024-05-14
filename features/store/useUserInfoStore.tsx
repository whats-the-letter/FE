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
    mainBackground: "pink",
    mainLp: "wtl",
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useUserInfoStore;
