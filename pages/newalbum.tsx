import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EditorAlbum from "../features/collection/components/AlbumSelect";
import BackSelect from "../features/collection/components/BackSelect";
import MusicSelect from "../features/collection/components/MusicSelect";
import PhrasesSelect from "../features/collection/components/PhrasesSelect";

export default function Page() {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<{ editor: string }>({
    mode: "onChange",
    defaultValues: {
      editor: "editor-love",
    },
  });

  const albumSelection = {
    "editor-love": "/assets/editor/editor-love.svg",
    "editor-money": "/assets/editor/editor-money.svg",
    "editor-success": "/assets/editor/editor-success.svg",
    "editor-health": "/assets/editor/editor-health.svg",
  };

  const labelMap: Record<string, string> = {
    "editor-love": "사랑",
    "editor-money": "재물",
    "editor-success": "성공",
    "editor-health": "건강",
  };

  const phrasesSelection = {
    "text-1": "/assets/editor/editor-1.svg",
    "text-2": "/assets/editor/editor-2.svg",
    "text-3": "/assets/editor/editor-3.svg",
    "text-4": "/assets/editor/editor-4.svg",
  };

  const [isEditor, setIsEditor] = useState("editor-love");
  const [isPhrases, setIsPhrases] = useState("editor-1");

  const onSubmit: SubmitHandler<{ editor: string }> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full">
        {/* <button className="flex items-center h-10 w-fit" type="submit">
          <span className="font-pretendard mx-2">다음 </span>
          <img src="/assets/icons/chevron_right.svg" alt="arrow-right" />
        </button> */}
      </div>
      <div className="flex flex-col w-full space-y-6 justify-center items-center">
        <form>
          <EditorAlbum
            albumSelection={albumSelection}
            labelMap={labelMap}
            isEditor={isEditor}
            onAlbumChange={(editor) => setIsEditor(editor)}
          />
          <PhrasesSelect
            albumSelection={albumSelection}
            isEditor={isEditor}
            phrasesSelection={phrasesSelection}
            isPhrases={isPhrases}
            onPhrasesChange={(phrases) => setIsPhrases(phrases)}
          />
        </form>
      </div>
    </>
  );
}
