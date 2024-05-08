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
import CompleteAlbum from "@/components/units/CompleteAlbum";

import { useMutation } from "@tanstack/react-query";
import { submitNewAlbumMutation } from "@/queries/newAlbum";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { mutate: submit } = useMutation(
    submitNewAlbumMutation({
      onSuccess(data, variables, context) {
        toNextStep(); 
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    })
  );

  const { Funnel, Step, useFunnel } = createFunnel([
    "albumCover",
    "phrases",
    "background",
    "music",
    "letter",
    "complete",
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

  const goPrev = async () => {
    if (!hasPrevStep) {
      router.back();
    }
    toPrevStep();
  };

  const goNext = () => {
    if (Step.name === "complete") {
      // handleSubmit(onSubmit)();
    }
    toNextStep();
  };

  const [selectedOptions, setSelectedOptions] = useState({
    albumCover: "editor-love",
    albumPhrases: "editor-1",
    albumBackground: "colorful",
    musicId: "1",
    letter: "",
  });
  const [selectedInput, setSelectedInput] = useState({
    toName: "",
    fromName: "",
  });
  const [selectedMusic, setSelectedMusic] = useState<MusicProps[]>([]);

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
              onClick={goPrev}
              className="flex flex-row items-center justify-between"
            >
              <Image src={left} alt="arrow-left" className="mr-2" />
              이전
            </button>

            <button
              onClick={goNext}
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
                <Step name="albumCover">
                  <AlbumSelect
                    {...register("albumCover")}
                    albumSelection={albumSelection}
                    labelMap={labelMap}
                    albumCover={selectedOptions.albumCover}
                    onAlbumChange={(albumCover) =>
                      handleOptionChange("albumCover", albumCover)
                    }
                  />
                </Step>
                <Step name="phrases">
                  <PhrasesSelect
                    {...register("albumPhrases")}
                    albumSelection={albumSelection}
                    albumCover={selectedOptions.albumCover}
                    phrasesSelection={phrasesSelection}
                    albumPhrases={selectedOptions.albumPhrases}
                    onPhrasesChange={(phrases) =>
                      handleOptionChange("albumPhrases", phrases)
                    }
                  />
                </Step>
                <Step name="background">
                  <BackSelect
                    {...register("albumBackground")}
                    albumSelection={albumSelection}
                    albumCover={selectedOptions.albumCover}
                    phrasesSelection={phrasesSelection}
                    albumPhrases={selectedOptions.albumPhrases}
                    backSelection={backSelection}
                    albumBackground={selectedOptions.albumBackground}
                    onBackChange={(back) =>
                      handleOptionChange("albumBackground", back)
                    }
                  />
                </Step>
                <Step name="music">
                  <MusicList
                    musicList={selectedMusic}
                    onMusicChange={(musicList: MusicProps[]) => {
                      setSelectedMusic(musicList);
                      handleOptionChange("musicId", musicList[0].musicId);
                    }}
                  />
                </Step>
                <Step name="letter">
                  <LetterWriting
                    {...register("letter")}
                    albumCover={selectedOptions.albumCover}
                    letterSelection={letterSelection}
                    onLetterContentChange={(content) =>
                      handleOptionChange("letter", content)
                    }
                    onToChange={(to) => handleInputChange("toName", to)}
                    onFromChange={(from) => handleInputChange("fromName", from)}
                  />
                </Step>
                <Step name="complete">
                  <CompleteAlbum
                    submittedAlbum={{
                      albumBackground: selectedOptions.albumBackground,
                      albumCover: selectedOptions.albumCover,
                      albumPhrases: selectedOptions.albumPhrases,
                      fromName: selectedInput.fromName,
                      letter: selectedOptions.letter,
                      music: selectedOptions.musicId,
                      toName: selectedInput.toName,
                    }}
                    selectedMusic={selectedMusic[0]}
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
