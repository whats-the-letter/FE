import { useForm } from "react-hook-form";
import Inputlabel from "../features/common/components/InputLabel";
import Input from "../features/common/components/Input";
import RoundRadioButton from "../features/common/components/RoundRadioButton";

export default function Page() {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<{
    nickname: string;
    lpBackground: string;
    lpDesign: string;
  }>({
    mode: "onChange",
    defaultValues: {
      lpBackground: "pink",
      lpDesign: "lp-luck",
    },
  });

  const isBackground = watch("lpBackground");
  const isLpDesign = watch("lpDesign");

  const onSubmit = (data: {
    nickname: string;
    lpBackground: string;
    lpDesign: string;
  }) => {
    console.log(data);
  };

  const onError = () => {};

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 max-w-screen-sm">
        <div className="w-full h-full flex flex-col justify-center m-auto">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className=" z-10 m-auto px-8 space-y-10 my-20">
              <div className="flex flex-col w-full space-y-6 ">
                {/* 닉네임 입력 */}
                <Inputlabel
                  label="닉네임"
                  required
                  errorMessage={errors.nickname?.message}
                >
                  <Input
                    {...register("nickname", {
                      required: "닉네임은 필수 입력입니다.",
                      minLength: {
                        value: 2,
                        message: "닉네임은 2글자 이상이어야 합니다.",
                      },
                      maxLength: {
                        value: 6,
                        message: "닉네임은 6글자 이하여야 합니다.",
                      },
                    })}
                    type="text"
                    placeholder="닉네임을 입력해주세요."
                  ></Input>
                </Inputlabel>

                {/* 배경색 선택 */}
                <Inputlabel
                  label="배경색 선택"
                  required
                  errorMessage={errors.lpBackground?.message}
                >
                  <div className="flex flex-row space-x-4">
                    <RoundRadioButton
                      {...register("lpBackground")}
                      label="bg-pink"
                      isChecked={isBackground === "pink"}
                      id="bg-pink"
                      value="pink"
                      className="bg-custom_pink"
                      name="lpBackground"
                    />
                    <RoundRadioButton
                      {...register("lpBackground")}
                      label="bg-blue"
                      isChecked={isBackground === "blue"}
                      id="bg-blue"
                      name="lpBackground"
                      value="blue"
                      className="bg-custom_skyblue"
                    />
                    <RoundRadioButton
                      {...register("lpBackground")}
                      label="bg-silver"
                      isChecked={isBackground === "silver"}
                      id="bg-silver"
                      name="lpBackground"
                      value="silver"
                      className="bg-custom_silver"
                    />
                    <RoundRadioButton
                      {...register("lpBackground")}
                      label="bg-gold"
                      isChecked={isBackground === "gold"}
                      id="bg-gold"
                      name="lpBackground"
                      value="gold"
                      className="bg-custom_gold"
                    />
                  </div>
                </Inputlabel>

                {/* LP 디자인 선택 */}
                <Inputlabel
                  label="LP 디자인 선택"
                  required
                  errorMessage={errors.lpDesign?.message}
                >
                  <div className="flex flex-row space-x-4 pb-10">
                    <RoundRadioButton
                      {...register("lpDesign")}
                      label="lp-luck"
                      isChecked={isLpDesign === "lp-luck"}
                      id="lp-luck"
                      name="lpDesign"
                      value="lp-luck"
                      className="bg-custom_red"
                    />
                    <RoundRadioButton
                      {...register("lpDesign")}
                      label="lp-dragon"
                      isChecked={isLpDesign === "lp-dragon"}
                      id="lp-dragon"
                      name="lpDesign"
                      value="lp-dragon"
                      className="bg-custom_blue"
                    />
                    <RoundRadioButton
                      {...register("lpDesign")}
                      label="lp-dny"
                      isChecked={isLpDesign === "lp-dny"}
                      id="lp-dny"
                      name="lpDesign"
                      value="lp-dny"
                      className="bg-custom_black"
                    />
                    <RoundRadioButton
                      {...register("lpDesign")}
                      label="lp-2024"
                      isChecked={isLpDesign === "lp-2024"}
                      id="lp-2024"
                      name="lpDesign"
                      value="lp-2024"
                      className="bg-custom_gold"
                    />
                  </div>
                </Inputlabel>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-black text-white rounded"
              >
                미리보기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
