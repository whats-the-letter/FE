import React, { forwardRef } from "react";
import EditorRadioButton from "../../../common/EditorRadioButton";

interface AlbumSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  albumSelection: Record<string, string>;
  labelMap: Record<string, string>;
  isEditor: string;
  onAlbumChange: (editor: string) => void;
}

// eslint-disable-next-line react/display-name
const AlbumSelect = forwardRef<HTMLInputElement, AlbumSelectProps>(
  ({ albumSelection, labelMap, isEditor, onAlbumChange, ...props }, ref) => {
    return (
      <>
        <span className="text-lg text-center font-pretendard">
          커버를 선택해주세요
        </span>
        <div className="relative">
          <img src={albumSelection[isEditor]} alt="editor" />
          <p className="text-[10px] text-[#9e9e9e] text-center font-pretendard font-thin mt-2">
            * 중앙에는 플레이리스트의 커버 이미지가 들어갑니다.
          </p>
        </div>

        <div className="flex flex-row gap-8 whitespace-nowrap pb-4">
          {Object.keys(albumSelection).map((editor) => (
            <EditorRadioButton
              ref={ref}
              name="editor"
              key={editor}
              id={editor}
              label={labelMap[editor]}
              selected={isEditor}
              onChange={() => onAlbumChange(editor)}
            />
          ))}
        </div>
      </>
    );
  }
);

export default AlbumSelect;
