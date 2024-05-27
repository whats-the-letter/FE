import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import person from "@/assets/icons/person.svg";
import help from "@/assets/icons/help.svg";
import logout from "@/assets/icons/logout.svg";
import close from "@/assets/icons/exit_button.svg";
import wtl from "@/assets/icons/wtl.svg";
import useUserInfoStore from "@/store/useUserInfoStore";

interface SidebarProps {
  isSidebarOpen: boolean;

  setSidebarOpen: (isSidebarOpen: boolean) => void;
}
export default function Sidebar({
  isSidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const sidebarRef = useRef(null);
  const { userInfo } = useUserInfoStore();
  const { userName } = userInfo;
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as HTMLElement).contains(event.target as Node)
      ) {
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
            <Image src={close} alt="close" className="mt-2 ml-2" />
            <div
              className="flex flex-col items-start justify-start gap-5 font-semibold m-4"
              ref={sidebarRef}
            >
              <div className="flex flex-row items-center gap-2">
                <Image src={wtl} alt="profile" className="w-7 h-7 mr-2" />
                <span className="text-xl my-4 ">{userName}님</span>
              </div>
              <Link href="/googleForm">
                <div className="flex flex-row items-center gap-2">
                  <Image src={help} alt="googleForm" />

                  <span>문의하기</span>
                </div>
              </Link>
              <Link href="/notion">
                <div className="flex flex-row items-center gap-2">
                  <Image src={person} alt="Devinfo" />
                  <span>개발자 정보</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  signOut();
                }}
              >
                <div className="flex flex-row items-center gap-2">
                  <Image src={logout} alt="logout" />
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
