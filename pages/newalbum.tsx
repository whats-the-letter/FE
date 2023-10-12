import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../features/common/utils/classNames";
import { useForm } from "react-hook-form";

export default function Page() {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<{
    editor: string;
  }>({
    mode: "onChange",
    defaultValues: {
      editor: "editor-love",
    },
  });

  const isEditor = watch("editor");

  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center z-10 m-auto space-y-10 max-w-screen-sm">
        <form>
          <div className="flex flex-col justify-center items-center m-auto px-8 space-y-10 my-20">
            <div className="flex w-full space-y-6 justify-end ">
              <button className="flex items-center h-10 w-fit ">
                <span className="font-pretendard mx-2">다음 </span>
                <img src="/assets/icons/chevron_right.svg" alt="arrow-right" />
              </button>
            </div>
            <span className="text-lg text-center font-pretendard">
              커버를 선택해주세요
            </span>
            <img src="/assets/editor/editor-love.svg" alt="cover" />

            <div className="flex flex-row gap-8">
              <EditorRadioButton
                {...register("editor", {})}
                id="editor-love"
                name="editor"
                value="editor-love"
                label="애정"
                selected={isEditor}
              ></EditorRadioButton>
              <EditorRadioButton
                {...register("editor", {})}
                id="editor-money"
                name="editor"
                value="editor-money"
                label="재물"
                selected={isEditor}
              ></EditorRadioButton>
              <EditorRadioButton
                {...register("editor", {})}
                id="editor-success"
                name="editor"
                value="editor-success"
                label="성공"
                selected={isEditor}
              ></EditorRadioButton>
              <EditorRadioButton
                {...register("editor", {})}
                id="editor-health"
                name="editor"
                value="editor-health"
                label="건강"
                selected={isEditor}
              ></EditorRadioButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

interface EditorRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  id: string;
  selected: boolean | string;

  name: string;
  value: string;
  defaultChecked?: boolean;
}

// eslint-disable-next-line react/display-name
const EditorRadioButton = forwardRef<HTMLInputElement, EditorRadioButtonProps>(
  ({ label, selected, id, name, value, defaultChecked, ...props }, ref) => {
    return (
      <>
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
        <label
          htmlFor={id}
          className={classNames(
            "font-pretendard text-[#9e9e9e]",
            selected === value && "text-black"
          )}
        >
          {label}
        </label>
      </>
    );
  }
);
