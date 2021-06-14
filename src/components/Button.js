const Button = ({ type, children, variant, textColor }) => {
  const btnStyle = `
      ${variant !== "disabled" ? textColor : "text-black"}
      ${variant ? variant : ""} ${
    variant !== "transparent" && "border-black border-opacity-20 border-b-4"
  }
      h-11 w-full rounded-lg 
      focus:ring-0 focus:outline-none active:border-b-0
      disabled:bg-disabled disabled:text-opacity-20 disabled:cursor-auto global-transition`;

  return (
    <>
      <button type={type} className={btnStyle}>
        {children}
      </button>
    </>
  );
};

export default Button;
