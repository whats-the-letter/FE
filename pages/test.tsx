import { ShareImageDrawer } from "@/components/units/ShareImage";
import React from "react";

const Main = () => {
  return (
    <div className="flex flex-col w-full h-screen p-2 items-center justify-center z-10 m-auto space-y-10 font-pretendard font-semibold">
      <ShareImageDrawer></ShareImageDrawer>
    </div>
  );
};

export default Main;
