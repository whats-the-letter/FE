import { forwardRef } from "react";
import EditorRadioButton from "../../common/EditorRadioButton";

interface BackSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  backSelection: Record<string, JSX.Element>;
  albumCover: string;
  albumPhrases: string;
  albumBackground: string;
  onBackChange: (back: string) => void;
  albumSelection: Record<string, string>;
  phrasesSelection: Record<string, string>;
}

//eslint-disable-next-line react/display-name
const BackSelect = forwardRef<HTMLInputElement, BackSelectProps>(
  (
    {
      backSelection,
      albumCover,
      onBackChange,
      albumSelection,
      phrasesSelection,
      albumPhrases,
      albumBackground,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div className="relative z-0">{backSelection[albumBackground]}</div>

        <div className="space-y-10 z-20">
          <span className="text-lg text-center font-pretendard z-0">
            배경을 선택해주세요
          </span>
          <div className="relative">
            <img src={albumSelection[albumCover]} alt="album" />
            <img
              src={phrasesSelection[albumPhrases]}
              alt="phrases"
              className="absolute top-[24%] left-[43%] transform -translate-x-1/2 -translate-y-1/2"
            />

            <p className="text-[10px] text-[#9e9e9e] text-center font-pretendard font-thin mt-2">
              * 중앙에는 플레이리스트의 커버 이미지가 들어갑니다.
            </p>
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-8 whitespace-nowrap z-20 pb-4">
            {Object.keys(backSelection).map((back) => (
              <EditorRadioButton
                {...props}
                ref={ref}
                name="text"
                key={back}
                id={back}
                label={back}
                selected={albumBackground}
                onChange={() => onBackChange(back)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
);

export default BackSelect;
