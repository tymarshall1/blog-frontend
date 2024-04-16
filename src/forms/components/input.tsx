import { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label: string;
  id: string;
  type: string;
  onChange: ChangeEventHandler;
  invalidInput: boolean;
  className?: string;
  disabled?: boolean;
  placeHolder?: string;
  defaultText?: string;
  value?: string;
};

function Input({
  label,
  id,
  type,
  onChange,
  invalidInput = false,
  className,
  disabled = false,
  placeHolder,
  defaultText,
  value,
}: InputProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="text-xl font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <input
        required
        className={`${
          invalidInput ? "outline-2 outline outline-destructive" : ""
        } h-8 pl-2 rounded`}
        id={id}
        type={type}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeHolder}
        defaultValue={defaultText}
        value={value}
      />
    </div>
  );
}

export default Input;
