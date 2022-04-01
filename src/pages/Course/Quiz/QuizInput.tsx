import { ChangeEvent } from "react";

interface Props {
  inputName?: string;
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isDisabled: boolean;
}

const QuizInput = ({
  inputName,
  value,
  onChangeValue,
  placeholder,
  isDisabled,
}: Props) => {
  return (
    <div className="mx-auto px-3 pt-3 pb-1">
      <input
        disabled={isDisabled}
        value={value}
        onChange={onChangeValue}
        name={inputName}
        placeholder={`${
          placeholder.charAt(0).toUpperCase() + placeholder.slice(1)
        }...`}
        autoComplete="off"
        className="w-full bg-transparent placeholder placeholder-black placeholder-opacity-50 focus:outline-none text-center"
        required
      />
    </div>
  );
};
export default QuizInput;
