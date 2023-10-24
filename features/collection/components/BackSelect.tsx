import { forwardRef } from "react";
import EditorRadioButton from "../../common/components/EditorRadioButton";

interface BackSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  backSelection: Record<string, JSX.Element>;
  isEditor: string;
  isPhrases: string;
  isBack: string;
  onBackChange: (back: string) => void;
  albumSelection: Record<string, string>;
  phrasesSelection: Record<string, string>;
}

//eslint-disable-next-line react/display-name
const BackSelect = forwardRef<HTMLInputElement, BackSelectProps>(
  (
    {
      backSelection,
      isEditor,
      onBackChange,
      albumSelection,
      phrasesSelection,
      isPhrases,
      isBack,
      ...props
    },
    ref
  ) => {
    return (
     <>
        <span className="text-lg text-center font-pretendard z-10">
          배경을 선택해주세요
        </span>

        <div className="relative">
          {backSelection[isBack]}

          <div className="relative">
            <img src={albumSelection[isEditor]} alt="album" />
            <img
              src={phrasesSelection[isPhrases]}
              alt="phrases"
              className="absolute top-[23%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            />

            <p className="text-[10px] text-[#9e9e9e] text-center font-pretendard font-thin mt-2">
              * 중앙에는 플레이리스트의 커버 이미지가 들어갑니다.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-8 whitespace-nowrap z-10">
          {Object.keys(backSelection).map((back) => (
            <EditorRadioButton
              {...props}
              ref={ref}
              name="text"
              key={back}
              id={back}
              label={back}
              selected={isBack}
              onChange={() => onBackChange(back)}
            />
          ))}
        </div>
      </>
    );
  }
);

export default BackSelect;
