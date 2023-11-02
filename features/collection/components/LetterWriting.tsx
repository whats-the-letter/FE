import React, { forwardRef, useState } from "react";
import { Controller } from "react-hook-form";

interface LetterWritingProps {
  isEditor: string;
  to: string;
  from: string;
  letterSelection: Record<string, string>;
  onLetterContentChange: (content: string) => void;
}

//eslint-disable-next-line react/display-name
const LetterWriting = forwardRef<HTMLInputElement, LetterWritingProps>(
  ({ isEditor, to, from, letterSelection, onLetterContentChange }, ref) => {
    const [letterContent, setLetterContent] = useState("");
    const handleContentChange = (e) => {
      const content = e.target.value;
      if (content.length <= 300) {
        setLetterContent(content);
        onLetterContentChange(content);
      }
    };
    return (
      <>
        <span className="text-lg text-center font-pretendard z-10">
          편지를 작성해주세요
        </span>
        <div className="flex flex-col z-10">
          <div className="text-sm text-left font-pretendard">
            To. <strong>{to}</strong>
          </div>
          <div className="relative">
            <img src={letterSelection[`${isEditor}-letter`]} alt="letter" />
            <textarea
              onChange={handleContentChange}
              placeholder="편지를 작성해주세요"
              value={letterContent}
              className="font-pretendard text-[12px] text-center absolute top-0 left-0 w-full h-full
            resize-none bg-transparent z-10"
            />
            <p className="text-xs text-right font-pretendard ">
              {letterContent.length}/300
            </p>
          </div>
          <div className="text-sm text-right font-pretendard z-10">
            From. <strong>{from}</strong>
          </div>
        </div>
      </>
    );
  }
);

export default LetterWriting;
