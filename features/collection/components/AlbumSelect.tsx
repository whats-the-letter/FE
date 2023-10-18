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
    <div className="flex flex-col justify-center items-center m-auto px-8 space-y-10 my-20">
      <div className="flex w-full space-y-6 justify-end">
        <button className="flex items-center h-10 w-fit" type="submit">
          <span className="font-pretendard mx-2">다음 </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/chevron_right.svg" alt="arrow-right" />
        </button>
      </div>
      <span className="text-lg text-center font-pretendard">
        커버를 선택해주세요
      </span>

      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={albumSelection[isEditor]}
          alt="editor"
          className="w-60 h-60"
        />
      </div>

      <div className="flex flex-row gap-8">
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
  );
};

export default AlbumSelect;
