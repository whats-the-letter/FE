import React from "react";
import EditorRadioButton from "../../common/components/EditorRadioButton";

interface AlbumSelectProps {
  albumSelection: Record<string, string>;
  labelMap: Record<string, string>;
  isEditor: string;
  onAlbumChange: (editor: string) => void;
}

const AlbumSelect: React.FC<AlbumSelectProps> = ({
  albumSelection,
  labelMap,
  isEditor,
  onAlbumChange,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto px-4 space-y-10 my-20">
        <span className="text-lg text-center font-pretendard">
          커버를 선택해주세요
        </span>

        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={albumSelection[isEditor]} alt="editor" />
        </div>

        <div className="flex flex-row gap-8 whitespace-nowrap">
          {Object.keys(albumSelection).map((editor) => (
            <EditorRadioButton
              name="editor"
              key={editor}
              id={editor}
              label={labelMap[editor]}
              selected={isEditor}
              onChange={() => onAlbumChange(editor)}
            />
          ))}
        </div>
        <p className="text-[12px] text-gray-400 text-center font-pretendard font-thin">
          중앙에는 플레이리스트의 커버 이미지가 들어갑니다.
        </p>
      </div>
    </>
  );
};

export default AlbumSelect;
