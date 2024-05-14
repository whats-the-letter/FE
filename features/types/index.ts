import { infoSvg } from "@/utils/data";

export type UserInfo = {
  userId: string;
  userName: string;
  email: string;
  mainBackground: keyof typeof infoSvg.mainBackground;
  mainLp: keyof typeof infoSvg.mainLp;
};
