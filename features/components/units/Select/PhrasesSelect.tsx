import React, { forwardRef } from "react";
import EditorRadioButton from "../../common/EditorRadioButton";

interface PhrasesSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  phrasesSelection: Record<string, string>;
  albumPhrases: string;
  albumCover: string;
  onPhrasesChange: (phrases: string) => void;
  albumSelection: Record<string, string>;
}
// eslint-disable-next-line react/display-name
const PhrasesSelect = forwardRef<HTMLInputElement, PhrasesSelectProps>(
  (
    {
      phrasesSelection,
      albumPhrases,
      albumCover,
      onPhrasesChange,
      albumSelection,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="space-y-10">
          <span className="text-lg text-center font-pretendard">
            문구를 선택해주세요
          </span>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={albumSelection[albumCover]} alt="album" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={phrasesSelection[albumPhrases]}
              alt="phrases"
              className="absolute top-[24%] left-[43%] transform -translate-x-1/2 -translate-y-1/2"
            />
            <p className="text-[10px] text-[#9e9e9e] text-center font-pretendard font-thin mt-2">
              * 중앙에는 플레이리스트의 커버 이미지가 들어갑니다.
            </p>
          </div>
          <div className="flex flex-row gap-8 justify-center items-center whitespace-nowrap pb-4">
            {Object.keys(phrasesSelection).map((phrases) => (
              <EditorRadioButton
                {...props}
                ref={ref}
                name="text"
                key={phrases}
                id={phrases}
                label={phrases.split("-")[1]}
                selected={albumPhrases}
                onChange={() => onPhrasesChange(phrases)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
);

export default PhrasesSelect;
