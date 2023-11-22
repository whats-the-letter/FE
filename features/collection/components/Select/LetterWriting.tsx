import React, { forwardRef, useState } from "react";
import { countCharacters, truncateContent } from "../../../utils/countTexts";
import Input from "../../../common/components/Input";
import Inputlabel from "../../../common/components/InputLabel";

interface LetterWritingProps {
  isEditor: string;
  letterSelection: Record<string, string>;
  onLetterContentChange: (content: string) => void;
  onToChange: (to: string) => void;
  onFromChange: (from: string) => void;
}

//eslint-disable-next-line react/display-name
const LetterWriting = forwardRef<HTMLInputElement, LetterWritingProps>(
  (
    {
      isEditor,
      letterSelection,
      onLetterContentChange,
      onToChange,
      onFromChange,
    },
    ref
  ) => {
    const [letterContent, setLetterContent] = useState("");
    const maxCharacters = 400;

    const handleContentChange = (e) => {
      let content = e.target.value;
      content = content.replace(/\n/g, "");

      const length = countCharacters(content);
      if (length > maxCharacters) {
        content = truncateContent(content, maxCharacters);
      }

      setLetterContent(content);
      onLetterContentChange(content);
    };

    const handleToChange = (e) => {
      const newTo = e.target.value;
      onToChange(newTo);
    };

    const handleFromChange = (e) => {
      const newFrom = e.target.value;
      onFromChange(newFrom);
    };

    return (
      <>
        <span className="text-lg text-center font-pretendard z-10">
          편지를 작성해주세요
        </span>
        <span className="flex flex-row justify-center w-full text-left font-pretendard">
          <Inputlabel label="To." required>
            <Input
              ref={ref}
              placeholder="받는 사람을 입력하세요."
              onChange={handleToChange}
            />
          </Inputlabel>
        </span>
        <div className="relative flex justify-center items-center text-center">
          <img
            src={letterSelection[`${isEditor}-letter`]}
            alt="letter"
            className="w-full h-full max-w-[288px] max-h-[288px]"
          />
          <div className="absolute bottom-6 right-7">
            <div className="flex justify-center items-center space-x-2">
              <img src="/assets/icons/bracket_left.svg" alt="bracket-left" />
              <p className="text-xs text-right font-pretendard ">
                {countCharacters(letterContent)} / {maxCharacters}
              </p>
              <img src="/assets/icons/bracket_right.svg" alt="bracket-right" />
            </div>
          </div>
          <textarea
            onChange={handleContentChange}
            placeholder="편지를 작성해주세요 :) "
            value={letterContent}
            className="flex justify-center items-center text-[12px] absolute w-full h-full max-w-[200px] max-h-[200px] font-pretendard
            resize-none bg-transparent z-0 outline-none"
          />
        </div>
        <div className="flex flex-row justify-center w-full text-left font-pretendard">
          <Inputlabel label="From." required>
            <Input placeholder="보내는 사람을 입력하세요." onChange={handleFromChange} />
          </Inputlabel>
        </div>
      </>
    );
  }
);

export default LetterWriting;
