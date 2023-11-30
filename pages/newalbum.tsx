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
import {
  albumSelection,
  labelMap,
  letterSelection,
  phrasesSelection,
  playListSelection,
} from "../features/utils/data";
import CompleteAlbum from "../features/collection/components/CompleteAlbum";

const backSelection = {
  colorful: <BackgroundColorful />,
  snow: <BackgroundSnow />,
  circles: <BackgroundCircles />,
};

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
    setSubmittedData(data);
    handleStepChange(step + 1);
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

  const [submittedData, setSubmittedData] = useState({});

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm space-y-4 font-semibold">
      <div className="flex flex-row justify-between w-full max-w-sm px-8 z-10 font-pretendard ">
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
          <button
            type="button"
            className="flex flex-row items-center justify-between"
            onClick={() => handleSubmit(onSubmit, onError)()}
          >
            제출
          </button>
        )}
      </div>
      <form>
        <div className="flex flex-col justify-center items-center gap-5 z-10">
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
            <MusicList
              {...register("music")}
              playListSelection={playListSelection}
              onMusicChange={(music) => {
                handleOptionChange("music", music);
              }}
            />
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
      {step === 6 && <CompleteAlbum submittedAlbum={submittedData} />}
    </div>
  );
}
