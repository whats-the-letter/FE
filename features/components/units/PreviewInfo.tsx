import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface PreivewInfoProps {
  submittedData: {
    email: string;
    userName: string;
    mainBackground: string;
    mainLp: string;
  };
  infoSvg: {
    mainBackground: Record<string, string>;
    mainLp: Record<string, string>;
  };
  playListButton: Record<string, string>;
  tapButton: Record<string, string>;

  onPrevious: () => void;
  onComplete: () => void;
}

const PreivewInfo: React.FC<PreivewInfoProps> = ({
  submittedData,
  playListButton,
  tapButton,
  infoSvg,
  onPrevious,
  onComplete,
}) => {
  const { data: session, status } = useSession();

  const handleComplete = async () => {
    try {
      const formData = new FormData();

      formData.append("email", session?.user?.email);
      formData.append(
        "mainBackground",
        submittedData.mainBackground.toUpperCase()
      );
      formData.append("mainLp", submittedData.mainLp.toUpperCase());
      formData.append("userName", submittedData.userName);

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        // Request successful
        console.log("Signup successful!");
      } else {
        // Request failed
        console.error("Signup failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div
      className="flex flex-col w-full h-full items-center justify-center m-auto p-4 gap-2
     "
    >
      <div className="relative max-w-[270px] max-h-[600px] mx-auto">
        <img
          className="w-full h-full object-cover "
          src={infoSvg.mainBackground[submittedData.mainBackground]}
          alt="preview-background"
        />

        <img
          className="absolute top-1/3 left-5 w-[230px] h-[230px] rotate-infinite"
          src={infoSvg.mainLp[submittedData.mainLp]}
          alt="preview-lpDesign"
        />
        <img
          src={tapButton[`tap-${submittedData.mainBackground}`]}
          alt="tap-button"
          className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 animate-bounce w-[90px] h-[90px]
          "
        />
        <img
          src="/assets/lp/lp-pin.svg"
          alt="lp-pin"
          className="absolute top-[40%] left-[65%] w-[100px] h-[160px]"
        />
        <img
          className="absolute top-[63%] left-[8%] w-[90px] h-[90px]"
          src={playListButton[`playlist-${submittedData.mainBackground}`]}
          alt="playlist"
        />
      </div>
      <div
        className="flex w-full h-full max-w-sm items-center justify-center mx-auto gap-4
      "
      >
        <button
          className="bg-[#E2E2E2] text-black w-40 max-w-[140px] p-2 rounded font-pretendard"
          onClick={onPrevious}
        >
          이전
        </button>

        <Link href="/main">
          <button
            className="bg-black text-white w-40 max-w-[140px] p-2 rounded font-pretendard"
            onClick={handleComplete}
            type="button"
          >
            완료
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PreivewInfo;
