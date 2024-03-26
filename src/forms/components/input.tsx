import { ChangeEventHandler } from "react";

type InputProps = {
  label: string;
  id: string;
  type: string;
  onChange: ChangeEventHandler;
  invalidInput: boolean;
};

function Input({
  label,
  id,
  type,
  onChange,
  invalidInput = false,
}: InputProps) {
  return (
    <div className="flex flex-col">
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
      />
    </div>
  );
}

export default Input;
