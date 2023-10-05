import { InputHTMLAttributes, forwardRef } from "react";
import { classNames } from "../utils/classNames";

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


export default RadioButton;