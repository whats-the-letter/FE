import AlbumSelect from "@/components/units/Select/AlbumSelect";
import createFunnel from "@/components/units/funnel/createFunnel";
import { FunnelProvider } from "@/contexts/useFunnelContexts";
import useNewAblumForm, { NewAlbumFormValues } from "@/hooks/useNewAlbumForm";
import { albumSelection, labelMap } from "@/utils/data";
import { playListSelection } from "@/utils/musicData";
import Image from "next/image";
import { useState } from "react";
import { Controller, FormProvider } from "react-hook-form";

import left from "@/assets/icons/chevron_left.svg";
import right from "@/assets/icons/chevron_right.svg";

const Page = () => {
  const { Funnel, Step, useFunnel } = createFunnel(["editor", "phrases"]);

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
    phrases: "editor-1",
    back: "colorful",
    music: playListSelection[0].youtubeUrlId,
    letter: "",
  });
  const [selectedInput, setSelectedInput] = useState({
    to: "",
    from: "",
  });

  const handleMusicChange = (musicData: { music: string }) => {
    setSelectedOptions({ ...selectedOptions, music: musicData.music });
  };
  const handleOptionChange = (optionName: string, optionValue: string) => {
    setSelectedOptions({ ...selectedOptions, [optionName]: optionValue });
  };

  const handleInputChange = (inputName: string, inputValue: string) => {
    setSelectedInput({ ...selectedInput, [inputName]: inputValue });
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto max-w-screen-sm max-h-screen-sm space-y-4 font-semibold">
        <FunnelProvider value={{ toPrevStep, toNextStep }}>
          <div className="flex flex-row justify-between w-full max-w-sm px-8 z-10 font-pretendard ">
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
                  {/* <AlbumSelect
                    {...register("editor")}
                    albumSelection={albumSelection}
                    labelMap={labelMap}
                    isEditor={selectedOptions.editor}
                    onAlbumChange={(albumCover) =>
                      handleOptionChange("albumCover", albumCover)
                    }
                  /> */}
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
