import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import BackSelect from "../features/collection/components/BackSelect";
import MusicSelect from "../features/collection/components/MusicSelect";
import PhrasesSelect from "../features/collection/components/PhrasesSelect";
import AlbumSelect from "../features/collection/components/AlbumSelect";
import BackgroundColorful from "../features/collection/components/background-animation/BackgroundColorful";
import BackgroundSnow from "../features/collection/components/background-animation/BackgroundSnow";
import BackgroundCircles from "../features/collection/components/background-animation/BackgroundCircles";

export default function Page() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<{ editor: string; phrases: string; back: string }>({
    mode: "onChange",
    defaultValues: {
      editor: "editor-love",
      phrases: "editor-1",
      back: "colorful",
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
    "editor-1": "/assets/editor/editor-1.svg",
    "editor-2": "/assets/editor/editor-2.svg",
    "editor-3": "/assets/editor/editor-3.svg",
    "editor-4": "/assets/editor/editor-4.svg",
  };

  const backSelection = {
    colorful: <BackgroundColorful />,
    snow: <BackgroundSnow />,
    circles: <BackgroundCircles />,
  };

  const [isEditor, setIsEditor] = useState("editor-love");
  const [isPhrases, setIsPhrases] = useState("editor-1");
  const [isBack, setIsBack] = useState("colorful");

  const onSubmit: SubmitHandler<{
    editor: string;
    phrases: string;
    back: string;
  }> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-row justify-between w-full"></div>
      <div className="flex flex-col w-full space-y-6 justify-center items-center">
        <form>
          <AlbumSelect
            {...register("editor", {})}
            albumSelection={albumSelection}
            labelMap={labelMap}
            isEditor={isEditor}
            onAlbumChange={(editor) => setIsEditor(editor)}
          />
          <PhrasesSelect
            {...register("phrases", {})}
            albumSelection={albumSelection}
            isEditor={isEditor}
            phrasesSelection={phrasesSelection}
            isPhrases={isPhrases}
            onPhrasesChange={(phrases) => setIsPhrases(phrases)}
          />
          <BackSelect
            {...register("back", {})}
            albumSelection={albumSelection}
            isEditor={isEditor}
            phrasesSelection={phrasesSelection}
            isPhrases={isPhrases}
            backSelection={backSelection}
            isBack={isBack}
            onBackChange={(back) => setIsBack(back)}
          />
        </form>
      </div>
    </>
  );
}
