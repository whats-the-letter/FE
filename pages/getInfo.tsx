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

    background: "yellow" | "blue" | "green" | "red" | "purple";
  }>({
    mode: "onChange",
  });

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
              <div className="flex flex-col w-full space-y-2 ">
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
              </div>
              <div className="flex flex-col w-full space-y-2">
                <span className=" font-bold">배경색 선택</span>
                <div className="flex flex-row w-full space-x-2"></div>
              </div>
              <button type="submit">제출하기</button>
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
        <p className="text-red-500 text-sm pt-0.5">{errorMessage}</p>
      )}
    </>
  );
});

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  selected: string;
  className: string;
  name: string;
  value: string;
}

// eslint-disable-next-line react/display-name
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ label, selected, className, name, value, ...props }, ref) => {
    return (
      <>
        <label
          className={classNames(
            "rounded-full h-10 w-10 p-3 border cursor-pointer",
            className
          )}
        >
          <input
            type="radio"
            {...props}
            ref={ref}
            required
            className="hidden "
          ></input>
        </label>
      </>
    );
  }
);
