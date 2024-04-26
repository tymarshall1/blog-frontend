import { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils";
type TextArea = {
  label: string;
  id: string;
  onChange: ChangeEventHandler;
  error: boolean;
  helperText?: string;
  className?: string;
  placeHolder?: string;
  required?: boolean;
};

function TextArea({
  id,
  label,
  onChange,
  error,
  helperText,
  className,
  placeHolder,
  required = true,
}: TextArea) {
  return (
    <div>
      <label className="text-xl font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <textarea
        className={cn(
          `${
            error ? "outline outline-destructive" : ""
          } w-full rounded pl-2 pt-1 resize-none`,
          className
        )}
        onChange={onChange}
        name={id}
        id={id}
        placeholder={placeHolder}
        required={required}
      ></textarea>
      <p className={`${error ? "text-destructive" : "text-white"} text-sm `}>
        {helperText}
      </p>
    </div>
  );
}

export default TextArea;
