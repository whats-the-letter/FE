import AlbumSelect from "@/components/units/Select/AlbumSelect";
import createFunnel from "@/components/units/funnel/createFunnel";
import { FunnelProvider } from "@/contexts/useFunnelContexts";
import useNewAblumForm, { NewAlbumFormValues } from "@/hooks/useNewAlbumForm";
import {
  albumSelection,
  labelMap,
  letterSelection,
  phrasesSelection,
} from "@/utils/data";
import Image from "next/image";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

import left from "@/assets/icons/chevron_left.svg";
import right from "@/assets/icons/chevron_right.svg";
import PhrasesSelect from "@/components/units/Select/PhrasesSelect";
import BackSelect from "@/components/units/Select/BackSelect";
import BackgroundColorful from "@/components/units/BackSelect-Animation/BackgroundColorful";
import BackgroundSnow from "@/components/units/BackSelect-Animation/BackgroundSnow";
import BackgroundCircles from "@/components/units/BackSelect-Animation/BackgroundCircles";

import LetterWriting from "@/components/units/Select/LetterWriting";
import MusicList, { MusicProps } from "@/components/units/Select/MusicList";

const Page = () => {
  const { Funnel, Step, useFunnel } = createFunnel([
    "editor",
    "phrases",
    "background",
    "musicList",
    "letter",
  ]);

  const { step, toPrevStep, toNextStep, hasPrevStep } = useFunnel();

  const newAblumForm = useNewAblumForm();

  const {
    handleSubmit,
    setFocus,
    setError,
    trigger,
    watch,
    register,
    formState,
  } = newAblumForm;
  const onSubmit = async (data: NewAlbumFormValues) => {
    console.log(data);
  };

  const [selectedOptions, setSelectedOptions] = useState({
    editor: "editor-love",
    albumPhrases: "editor-1",
    albumBackground: "snow",
    music: "",
    letter: "",
  });
  const [selectedInput, setSelectedInput] = useState({
    to: "",
    from: "",
  });

  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions({ ...selectedOptions, [optionName]: optionValue });
  };

  const handleInputChange = (inputName: string, inputValue: string) => {
    setSelectedInput({ ...selectedInput, [inputName]: inputValue });
  };

  const backSelection = {
    colorful: <BackgroundColorful />,
    snow: <BackgroundSnow />,
    circles: <BackgroundCircles />,
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm space-y-4 font-semibold">
        <FunnelProvider value={{ toPrevStep, toNextStep }}>
          <div className="flex flex-row justify-between w-full max-w-sm px-8 z-20 font-pretendard ">
            <button
              onClick={toPrevStep}
              className="flex flex-row items-center justify-between"
            >
              <Image src={left} alt="arrow-left" className="mr-2" />
              이전
            </button>

            <button
              onClick={toNextStep}
              className="flex flex-row items-center justify-between"
            >
              다음
              <Image src={right} alt="arrow-left" className="ml-2" />
            </button>
          </div>

          <div className="flex flex-row justify-between w-full max-w-sm px-8 z-10 font-pretendard "></div>

          <FormProvider {...newAblumForm}>
            <div className="flex flex-col text-center justify-center items-center w-full max-w-sm px-8 z-10 gap-10 font-pretendard ">
              <Funnel step={step}>
                <Step name="editor">
                  <AlbumSelect
                    {...register("editor")}
                    albumSelection={albumSelection}
                    labelMap={labelMap}
                    isEditor={selectedOptions.editor}
                    onAlbumChange={(editor) =>
                      handleOptionChange("editor", editor)
                    }
                  />
                </Step>
                <Step name="phrases">
                  <PhrasesSelect
                    {...register("albumPhrases")}
                    albumSelection={albumSelection}
                    isEditor={selectedOptions.editor}
                    phrasesSelection={phrasesSelection}
                    isPhrases={selectedOptions.albumPhrases}
                    onPhrasesChange={(phrases) =>
                      handleOptionChange("albumPhrases", phrases)
                    }
                  />
                </Step>
                <Step name="background">
                  <BackSelect
                    {...register("albumBackground")}
                    albumSelection={albumSelection}
                    isEditor={selectedOptions.editor}
                    phrasesSelection={phrasesSelection}
                    isPhrases={selectedOptions.albumPhrases}
                    backSelection={backSelection}
                    isBack={selectedOptions.albumBackground}
                    onBackChange={(back) =>
                      handleOptionChange("albumBackground", back)
                    }
                  />
                </Step>
                <Step name="musicList">
                  <MusicList
                    musicList={[]}
                    onMusicChange={(musicList: MusicProps[]) => {
                      handleOptionChange(
                        "musicArtist",
                        musicList[0].musicArtist
                      );
                      handleOptionChange("musicName", musicList[0].musicName);
                    }}
                    {...register("musicName")}
                    {...register("musicArtist")}
                  />
                </Step>
                <Step name="letter">
                  <LetterWriting
                    {...register("letter")}
                    isEditor={selectedOptions.editor}
                    letterSelection={letterSelection}
                    onLetterContentChange={(content) =>
                      handleOptionChange("letter", content)
                    }
                    {...register("toName")}
                    onToChange={(to) => handleInputChange("toName", to)}
                    {...register("fromName")}
                    onFromChange={(from) => handleInputChange("fromName", from)}
                  />
                </Step>
              </Funnel>
            </div>
          </FormProvider>
        </FunnelProvider>
      </div>
    </>
  );
};

export default Page;
