import Link from "next/link";
import { useEffect, useRef } from "react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
}
export default function Sidebar({
  isSidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSidebarOpen]);

  return (
    <>
      {isSidebarOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div
            className={`fixed top-0 left-0 w-1/2 max-w-screen-sm h-screen bg-[#f1f1f1] z-20 p-4 shadow-xl transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <img
              src="/assets/icons/close.svg"
              alt="close"
              className="mt-2 ml-2"
            />
            <div
              className="flex flex-col items-start justify-start gap-5 font-semibold m-4"
              ref={sidebarRef}
            >
              <div className="flex flex-row items-center gap-2">
                <img src="/assets/lp/lp-dny.svg" alt="profile" className="w-7 h-7 mr-2"/>
              <span className="text-xl my-4 ">닉네임</span>
              </div>
              <Link href="/googleForm">
                <div className="flex flex-row items-center gap-2">
                  <img src="/assets/icons/help.svg" alt="googleForm" />
                  <span>문의하기</span>
                </div>
              </Link>
              <Link href="/notion">
              <div className="flex flex-row items-center gap-2">
                <img src="/assets/icons/person.svg" alt="Devinfo" />
                <span>개발자 정보</span>
                </div>
              </Link>
              <button>
              <div className="flex flex-row items-center gap-2">
                <img src="/assets/icons/logout.svg" alt="logout" />
                <span>로그아웃</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
