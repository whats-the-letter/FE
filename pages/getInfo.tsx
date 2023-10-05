import { useForm } from "react-hook-form";
import Inputlabel from "../features/common/components/InputLabel";
import Input from "../features/common/components/Input";
import RadioButton from "../features/common/components/RadioButton";

export default function Page() {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<{
    nickname: string;
    background: string;
    lpDesign: string;
  }>({
    mode: "onChange",
    defaultValues: {
      background: "pink",
      lpDesign: "red",
    },
  });

  const isBackground = watch("background");
  const isLpDesign = watch("lpDesign");

  const onSubmit = (data: { nickname: string; background: string }) => {
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

                <Inputlabel
                  label="배경색 선택"
                  required
                  errorMessage={errors.background?.message}
                >
                  <div className="flex flex-row space-x-4">
                    <RadioButton
                      {...register("background", {})}
                      id="bg-pink"
                      name="background"
                      value="pink"
                      label="bg-pink"
                      selected={isBackground}
                      className="bg-customPink"
                    />
                    <RadioButton
                      {...register("background", {})}
                      id="bg-blue"
                      name="background"
                      value="blue"
                      label="bg-blue"
                      selected={isBackground}
                      className="bg-customSkyblue"
                    />
                    <RadioButton
                      {...register("background", {})}
                      id="bg-silver"
                      name="background"
                      value="silver"
                      label="bg-silver"
                      selected={isBackground}
                      className="bg-customSilver"
                    />
                    <RadioButton
                      {...register("background", {})}
                      id="bg-gold"
                      name="background"
                      value="gold"
                      label="bg-gold"
                      selected={isBackground}
                      className="bg-customGold"
                    />
                  </div>
                </Inputlabel>

                <Inputlabel
                  label="LP 디자인 선택"
                  required
                  errorMessage={errors.lpDesign?.message}
                >
                  <div className="flex flex-row space-x-4 pb-10">
                    <RadioButton
                      {...register("lpDesign", {})}
                      id="lp-red"
                      name="lpDesign"
                      value="red"
                      label="lp-red"
                      selected={isLpDesign}
                      className="bg-customRed"
                    />
                    <RadioButton
                      {...register("lpDesign", {})}
                      id="lp-blue"
                      name="lpDesign"
                      value="blue"
                      label="lp-blue"
                      selected={isLpDesign}
                      className="bg-customBlue"
                    />
                    <RadioButton
                      {...register("lpDesign", {})}
                      id="lp-silver"
                      name="lpDesign"
                      value="silver"
                      label="lp-silver"
                      selected={isLpDesign}
                      className="bg-customBlack"
                    />
                    <RadioButton
                      {...register("lpDesign", {})}
                      id="lp-gold"
                      name="lpDesign"
                      value="gold"
                      label="lp-gold"
                      selected={isLpDesign}
                      className="bg-customGold"
                    />
                  </div>
                </Inputlabel>
              </div>

              <button
                type="submit"
                className="w-full h-10 bg-black text-white rounded"
              >
                미리보기{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
