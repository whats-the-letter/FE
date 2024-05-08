import React, { forwardRef, useState } from "react";
import { countCharacters, truncateContent } from "../../../utils/countTexts";
import Input from "../../common/Input";

import Image from "next/image";
import letterBg from "/features/assets/letter/letter-bg.svg";
import bracketLeft from "/features/assets/icons/bracket_left.svg";
import bracketRight from "/features/assets/icons/bracket_right.svg";
import Inputlabel from "@/components/common/InputLabel";

interface LetterWritingProps {
  albumCover: string;
  letterSelection: Record<string, string>;
  onLetterContentChange: (content: string) => void;
  onToChange: (to: string) => void;
  onFromChange: (from: string) => void;
}

//eslint-disable-next-line react/display-name
const LetterWriting = forwardRef<HTMLInputElement, LetterWritingProps>(
  (
    {
      albumCover,
      letterSelection,
      onLetterContentChange,
      onToChange,
      onFromChange,
    },
    ref
  ) => {
    const [letterContent, setLetterContent] = useState("");
    const maxCharacters = 300;

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let content = e.target.value;
      content = content.replace(/\n/g, "");

      const length = countCharacters(content);
      if (length > maxCharacters) {
        content = truncateContent(content, maxCharacters);
      }

      setLetterContent(content);
      onLetterContentChange(content);
    };

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTo = e.target.value;
      onToChange(newTo);
    };

    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFrom = e.target.value;
      onFromChange(newFrom);
    };

    return (
      <>
        <span className="text-lg text-center font-pretendard z-10">
          편지를 작성해주세요
        </span>
        <span className="flex flex-row justify-center w-full text-left font-pretendard gap-2">
          <strong className="mt-4">To.</strong>
          <Inputlabel label="" required errorMessage="받는 사람을 입력하세요.">
            <Input onChange={handleToChange} />
          </Inputlabel>
        </span>
        <div className="relative flex justify-center items-center text-center">
          <div className="relative w-[288px] h-[288px]">
            <Image
              src={letterBg}
              alt="letterBg"
              className="absolute inset-0 w-full h-full z-0"
            />
            <textarea
              onChange={handleContentChange}
              placeholder="편지를 작성해주세요 :) "
              value={letterContent}
              className="text-[11px] absolute inset-0 w-full h-full p-12 resize-none bg-transparent z-10 outline-none"
            />
            <img
              src={letterSelection[`${albumCover}-letter`]}
              alt="letterImage"
              className="absolute inset-0 w-full h-full z-5"
            />
          </div>

          <div className="absolute bottom-6 right-7">
            <div className="flex justify-center items-center space-x-2">
              <Image src={bracketLeft} alt="bracket-left" />
              <p className="text-xs text-right font-pretendard ">
                {countCharacters(letterContent)} / {maxCharacters}
              </p>
              <Image src={bracketRight} alt="bracket-right" />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center w-full text-left font-pretendard gap-2">
          <strong className="mt-4">From.</strong>
          <Inputlabel
            label=""
            required
            errorMessage="보내는 사람을 입력하세요."
          >
            <Input onChange={handleFromChange} />
          </Inputlabel>
        </div>
      </>
    );
  }
);

export default LetterWriting;
