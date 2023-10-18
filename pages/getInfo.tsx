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
                  errorMessage={errors.background?.message}
                >
                  <div className="flex flex-row space-x-4">
                    {["pink", "skyblue", "silver", "gold"].map((color) => (
                      <RoundRadioButton
                        key={color}
                        {...register("background", {})}
                        id={`bg-${color}`}
                        name="background"
                        value={color}
                        label={`bg-${color}`}
                        selected={isBackground}
                        className={`bg-custom${
                          color.charAt(0).toUpperCase() + color.slice(1)
                        }`}
                      />
                    ))}
                  </div>
                </Inputlabel>

                {/* LP 디자인 선택 */}
                <Inputlabel
                  label="LP 디자인 선택"
                  required
                  errorMessage={errors.lpDesign?.message}
                >
                  <div className="flex flex-row space-x-4 pb-10">
                    {["red", "blue", "black", "gold"].map((color) => (
                      <RoundRadioButton
                        key={color}
                        {...register("lpDesign", {})}
                        id={`lp-${color}`}
                        name="lpDesign"
                        value={color}
                        label={`lp-${color}`}
                        selected={isLpDesign}
                        className={`bg-custom${
                          color.charAt(0).toUpperCase() + color.slice(1)
                        }`}
                      />
                    ))}
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
