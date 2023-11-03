import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../../utils/classNames";

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

export default Input;
