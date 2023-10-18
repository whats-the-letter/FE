import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EditorAlbum from "../features/collection/components/AlbumSelect";

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

  const [isEditor, setIsEditor] = useState("editor-love");

  const onSubmit: SubmitHandler<{ editor: string }> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 max-w-screen-sm">
        <form>
          <EditorAlbum
            albumSelection={albumSelection}
            labelMap={labelMap}
            isEditor={isEditor}
            onAlbumChange={(editor) => setIsEditor(editor)}
          />
        </form>
      </div>
    </>
  );
}
