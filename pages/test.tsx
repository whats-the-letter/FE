import React from "react";
import Skeleton from "react-loading-skeleton";

const MainSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-screen p-2 items-center justify-center z-10 m-auto space-y-10 font-pretendard font-semibold">
      <div className="relative w-full h-[80%]">
        <Skeleton className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="transform -translate-x-1/2 -translate-y-1/2 rotate-infinite mt-10 w-[200px] h-[200px]" />
        </div>
        <Skeleton className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[50px]" />
        <Skeleton className="absolute top-[40%] left-[65%] w-[50px] h-[50px]" />
        <Skeleton className="absolute top-[68%] left-[8%] w-[100px] h-[50px]" />
      </div>
    </div>
  );
};

export default MainSkeleton;
