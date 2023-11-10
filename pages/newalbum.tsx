import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import BackSelect from "../features/collection/components/Select/BackSelect";
import PhrasesSelect from "../features/collection/components/Select/PhrasesSelect";
import AlbumSelect from "../features/collection/components/Select/AlbumSelect";
import BackgroundColorful from "../features/collection/components/BackSelect-Animation/BackgroundColorful";
import BackgroundSnow from "../features/collection/components/BackSelect-Animation/BackgroundSnow";
import BackgroundCircles from "../features/collection/components/BackSelect-Animation/BackgroundCircles";
import LetterWriting from "../features/collection/components/Select/LetterWriting";
import MusicList from "../features/collection/components/Select/MusicList";

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
  "editor-5": "/assets/editor/editor-5.svg",
};

const letterSelection = {
  "editor-love-letter": "/assets/letter/letter-love.svg",
  "editor-money-letter": "/assets/letter/letter-money.svg",
  "editor-success-letter": "/assets/letter/letter-success.svg",
  "editor-health-letter": "/assets/letter/letter-health.svg",
};

const backSelection = {
  colorful: <BackgroundColorful />,
  snow: <BackgroundSnow />,
  circles: <BackgroundCircles />,
};

const playListSelection = [
  {
    id: 0,
    name: "크리스마스 캐롤 캐빈",
    artist: "여경이",
    youtubeUrlId: "YAsAQgoh52I",
    
  },
  {
    id: 1,
    name: "크리스마스 캐롤2 에센셜",
    artist: "현지",
    youtubeUrlId: "a_80o2lDYec",
  },
];

export default function Page() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      editor: "editor-love",
      phrases: "editor-1",
      back: "colorful",
      music: "",
      letter: "",
      to: "",
      from: "",
    },
  });

  // const youtubeVideoId = "YAsAQgoh52I";

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    editor: "editor-love",
    phrases: "editor-1",
    back: "colorful",
    music: "",
    letter: "",
  });

  const [selectedInput, setSelectedInput] = useState({
    to: "",
    from: "",
  });

  const handleStepChange = (newStep) => {
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
    music: string;
    letter: string;
    to: string;
    from: string;
  }> = (data) => {
    data.editor = selectedOptions.editor;
    data.phrases = selectedOptions.phrases;
    data.back = selectedOptions.back;
    data.music = selectedOptions.music;
    data.letter = selectedOptions.letter;
    data.to = selectedInput.to;
    data.from = selectedInput.from;

    console.log(data);
  };

  const onError = () => {};
  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions({ ...selectedOptions, [optionName]: optionValue });
  };

  const handleInputChange = (inputName: string, inputValue: string) => {
    setSelectedInput({ ...selectedInput, [inputName]: inputValue });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm">
      <div className="flex flex-row justify-between w-full max-w-sm px-8 py-2 z-10 mt-20 font-pretendard">
        <button
          onClick={handlePrevious}
          className="flex flex-row items-center justify-between"
        >
          <img
            src="/assets/icons/chevron_left.svg"
            alt="arrow-left"
            className="mr-2"
          />
          이전
        </button>
        {step < 5 && (
          <button
            className="flex flex-row items-center justify-between"
            onClick={() => handleStepChange(step + 1)}
          >
            다음
            <img
              src="/assets/icons/chevron_right.svg"
              alt="arrow-right"
              className="ml-2"
            />
          </button>
        )}
        {step === 5 && (
          <button onClick={handleSubmit(onSubmit, onError)}>제출</button>
        )}
      </div>
      <form>
        <div className="flex flex-col justify-center items-center space-y-8 my-10 z-10">
          {step === 1 && (
            <AlbumSelect
              {...register("editor")}
              albumSelection={albumSelection}
              labelMap={labelMap}
              isEditor={selectedOptions.editor}
              onAlbumChange={(editor) => handleOptionChange("editor", editor)}
            />
          )}
          {step === 2 && (
            <PhrasesSelect
              {...register("phrases")}
              albumSelection={albumSelection}
              isEditor={selectedOptions.editor}
              phrasesSelection={phrasesSelection}
              isPhrases={selectedOptions.phrases}
              onPhrasesChange={(phrases) =>
                handleOptionChange("phrases", phrases)
              }
            />
          )}
          {step === 3 && (
            <BackSelect
              {...register("back")}
              albumSelection={albumSelection}
              isEditor={selectedOptions.editor}
              phrasesSelection={phrasesSelection}
              isPhrases={selectedOptions.phrases}
              backSelection={backSelection}
              isBack={selectedOptions.back}
              onBackChange={(back) => handleOptionChange("back", back)}
            />
          )}
          {step === 4 && (
            <>
              <MusicList
                playListSelection={playListSelection}
                isMusic={selectedOptions.music}
                onMusicChange={(music) => handleOptionChange("music", music)}
              />
            </>
          )}

          {step === 5 && (
            <LetterWriting
              {...register("letter")}
              isEditor={selectedOptions.editor}
              letterSelection={letterSelection}
              onLetterContentChange={(content) =>
                handleOptionChange("letter", content)
              }
              {...register("to")}
              onToChange={(to) => handleInputChange("to", to)}
              {...register("from")}
              onFromChange={(from) => handleInputChange("from", from)}
            />
          )}
        </div>
      </form>
    </div>
  );
}
