import { useState } from "react";
import Link from "next/link";
import Sidebar from "../../features/components/collection/components/Sidebar";

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const collection = {
    number: 10,
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-sm h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard font-semibold ">
        <div className="flex justify-start items-center w-full">
          <button type="button" onClick={toggleSidebar}>
            <img src="/assets/icons/menu.svg" alt="menu" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <span>나의 컬렉션 </span>
          <span>
            총 <strong>{collection.number}</strong>개
          </span>
        </div>
        <div className="flex grid-row-2 w-full gap-3">
          <div className="flex w-full h-40 bg-gray-300 rounded-md"> 앨범 </div>
          <div className="flex w-full h-40 bg-gray-300 rounded-md"> 앨범 </div>
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
}
