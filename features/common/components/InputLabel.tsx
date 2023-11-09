import { PropsWithChildren } from "react";

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
      <p className="text-custom_red text-sm pt-0.5">{errorMessage}</p>
    </div>
  );
}

export default Inputlabel;
