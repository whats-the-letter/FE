import { Controller, useForm } from "react-hook-form";
import { classNames } from "../features/common/utils/classNames";
import { InputHTMLAttributes, PropsWithChildren, forwardRef } from "react";

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

interface InputlabelProps {
  label: string;
  errorMessage?: string;
  required?: boolean;
}

function Inputlabel({
  children,
  label,
  errorMessage,
  required,
}: PropsWithChildren<InputlabelProps>) {
  return (
    <div className="flex flex-col w-full space-y-2">
      <span className=" font-bold">{label}</span>
      {required}
      {children}
      <p className="text-customRed text-sm pt-0.5">{errorMessage}</p>
    </div>
  );
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { errorMessage, ...props },
  ref
) {
  const showError = errorMessage !== "";

  return (
    <>
      <div
        className={classNames(
          "relative w-full h-fit border-none",
          "focus-within:outline-none",
          showError && "border-red-500 focus-within:border-red-500"
        )}
      >
        <input
          {...props}
          ref={ref}
          className={classNames(
            "w-full h-10 input-underline placeholder:text-left",
            "focus:outline-none",
            "placeholder:text-gray-300"
          )}
          {...props}
        />
      </div>
      {errorMessage !== "" && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </>
  );
});

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  selected: boolean | string;
  className: string;
  name: string;
  value: string;
  defaultChecked?: boolean;
}

// eslint-disable-next-line react/display-name
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { label, selected, id, className, name, value, defaultChecked, ...props },
    ref
  ) => {
    return (
      <>
        <label
          htmlFor={id}
          className={classNames(
            "relative rounded-full h-10 w-10  border-1 cursor-pointer",
            className,
            selected === value && "border border-black"
          )}
        >
          <div className="flex itmes-center">
            <input
              id={id}
              value={value}
              name={name}
              type="radio"
              {...props}
              ref={ref}
              required
              className="hidden"
            ></input>
            {selected === value && (
              <img
                src="/assets/icons/selected.svg"
                alt="selected"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
              />
            )}
          </div>
        </label>
      </>
    );
  }
);
