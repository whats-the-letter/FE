import React, { forwardRef, InputHTMLAttributes } from "react";
import { classNames } from "../../utils/classNames";

interface EditorRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  selected: string;
  name: string;
  defaultChecked?: boolean;
}
// eslint-disable-next-line react/display-name
const EditorRadioButton = forwardRef<HTMLInputElement, EditorRadioButtonProps>(
  ({ label, selected, id, name, value, defaultChecked, ...props }, ref) => {
    return (
      <>
        <input
          id={id}
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
            "font-pretendard text-[#9e9e9e] hover:cursor-pointer hover:text-gray-500",
            selected === id && "text-black"
          )}
        >
          {label}
        </label>
      </>
    );
  }
);

export default EditorRadioButton;
