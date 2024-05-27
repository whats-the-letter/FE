import Image from "next/image";
import oops from "@/assets/icons/oops.svg";
import Link from "next/link";

const AlreadyAdd = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto p-4 px-10 space-y-10 font-pretendard font-semibold ">
      <Image src={oops} alt="404" />
      <h1 className="text-xl"> 앗! 이미 저장된 앨범입니다.</h1>
      <div className="flex flex-col items-center justify-center z-10 py-4 font-pretendard font-normal text-sm text-center space-y-0.5">
        <span>
          이 앨범은 이미 누군가가 컬렉션에 저장한 앨범입니다. <br />
          나도 새 앨범을 만들어 선물해보는 건 어떨까요?
        </span>
      </div>

      <Link href={`/newalbum`}>
        <div className="bg-black rounded-md text-center w-64 h-10 p-2  m-auto  items-center text-white text-sm font-pretendard font-semibold">
          <span>나도 앨범 보내기</span>
        </div>
      </Link>
    </div>
  );
};

export default AlreadyAdd;
