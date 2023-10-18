import React from "react";
import EditorRadioButton from "../../common/components/EditorRadioButton";

interface PhrasesSelectProps {
  phrasesSelection: Record<string, string>;
  isPhrases: string;
  isEditor: string;
  onPhrasesChange: (phrases: string) => void;
  albumSelection: Record<string, string>;
}

const PhrasesSelect: React.FC<PhrasesSelectProps> = ({
  phrasesSelection,
  isEditor,
  isPhrases,
  onPhrasesChange,
  albumSelection,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto px-4 space-y-10 my-20">
        <span className="text-lg text-center font-pretendard">
          문구를 선택해주세요
        </span>
        <div className="relative">
          <img src={albumSelection[isEditor]} alt="album" />
          <img
            src={phrasesSelection[isPhrases]}
            alt="phrases"
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex flex-row gap-8 whitespace-nowrap">
          {Object.keys(phrasesSelection).map((phrases) => (
            <EditorRadioButton
              name="text"
              key={phrases}
              id={phrases}
              label={phrases.split("-")[1]}
              selected={isPhrases}
              onChange={() => onPhrasesChange(phrases)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PhrasesSelect;
