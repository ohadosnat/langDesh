const QuizInput = ({
  inputName,
  value,
  onChangeValue,
  type,
  placeholder,
  innerRef,
  isDisabled,
}) => {
  const capitalizedPlaceholder =
    (placeholder || type).charAt(0).toUpperCase() +
    (placeholder || type).slice(1);

  return (
    <div className="mx-auto px-3 pt-3 pb-1">
      <input
        disabled={isDisabled}
        value={value}
        onChange={onChangeValue}
        ref={innerRef}
        name={inputName || type}
        type={type === "search" ? "text" : type}
        placeholder={`${capitalizedPlaceholder}...`}
        autoComplete="off"
        className="w-full bg-transparent placeholder placeholder-black placeholder-opacity-50 focus:outline-none text-center"
        required
      />
    </div>
  );
};
export default QuizInput;
