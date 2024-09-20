import { ChangeEventHandler } from "react";

type FileInput = {
  label: string;
  id: string;
  onchange: ChangeEventHandler;
  helperText?: string;
  error: boolean;
  required?: boolean;
  className?: string;
};

function FileInput({
  id,
  label,
  onchange,
  helperText,
  error,
  required = true,
  className,
}: FileInput) {
  return (
    <div>
      <label className="text-xl font-medium text-white" htmlFor={id}>
        {label}
      </label>
      <input
        className={`${
          error ? "outline-destructive" : "outline-none"
        } ${className} block w-full bg-white border outline outline-2 rounded cursor-pointer text-md focus:outline-none `}
        type="file"
        onChange={onchange}
        id={id}
        required={required}
      />
      <p className={`${error ? "text-destructive" : "text-white"} text-sm `}>
        {helperText}
      </p>
    </div>
  );
}

export default FileInput;
