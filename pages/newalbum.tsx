import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import BackSelect from "../features/collection/components/BackSelect";
import PhrasesSelect from "../features/collection/components/PhrasesSelect";
import AlbumSelect from "../features/collection/components/AlbumSelect";
import BackgroundColorful from "../features/collection/components/background-animation/BackgroundColorful";
import BackgroundSnow from "../features/collection/components/background-animation/BackgroundSnow";
import BackgroundCircles from "../features/collection/components/background-animation/BackgroundCircles";

const albumSelection = {
  "editor-love": "/assets/editor/editor-love.svg",
  "editor-money": "/assets/editor/editor-money.svg",
  "editor-success": "/assets/editor/editor-success.svg",
  "editor-health": "/assets/editor/editor-health.svg",
};

const labelMap = {
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

export default function Page() {
  const { register, handleSubmit } = useForm<{
    editor: string;
    phrases: string;
    back: string;
  }>({
    defaultValues: {
      editor: "editor-love",
      phrases: "editor-1",
      back: "colorful",
    },
  });

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isEditor, setIsEditor] = useState("editor-love");
  const [isPhrases, setIsPhrases] = useState("editor-1");
  const [isBack, setIsBack] = useState("colorful");

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handlePrevious = () => {
    if (step === 1) {
      router.push("/main");
    } else {
      handleStepChange(step - 1);
    }
  };

  const onSubmit: SubmitHandler<{
    editor: string;
    phrases: string;
    back: string;
  }> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm">
        <div className="flex flex-row justify-between w-full px-4 z-10 font-pretendard">
          <button onClick={handlePrevious}>이전</button>
          {step < 3 && (
            <button onClick={() => handleStepChange(step + 1)}>다음</button>
          )}
          {step === 3 && <button onClick={handleSubmit(onSubmit)}>제출</button>}
        </div>
        <form>
          <div className="flex flex-col justify-center items-center space-y-10 my-10 z-10">
            {step === 1 && (
              <AlbumSelect
                {...register("editor")}
                albumSelection={albumSelection}
                labelMap={labelMap}
                isEditor={isEditor}
                onAlbumChange={(editor) => setIsEditor(editor)}
              />
            )}
            {step === 2 && (
              <PhrasesSelect
                {...register("phrases")}
                albumSelection={albumSelection}
                isEditor={isEditor}
                phrasesSelection={phrasesSelection}
                isPhrases={isPhrases}
                onPhrasesChange={(phrases) => setIsPhrases(phrases)}
              />
            )}
            {step === 3 && (
              <BackSelect
                {...register("back")}
                albumSelection={albumSelection}
                isEditor={isEditor}
                phrasesSelection={phrasesSelection}
                isPhrases={isPhrases}
                backSelection={backSelection}
                isBack={isBack}
                onBackChange={(back) => setIsBack(back)}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
