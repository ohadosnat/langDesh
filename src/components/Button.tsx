interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant:
    | "default"
    | "generalOrange"
    | "general"
    | "disabled"
    | "transparent"
    | "wrong"
    | "correct"
    | langsID;
  textColor?: string;
  isDisabled?: boolean;
  onClickHandle?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/**
 * A general Button Component
 * @param type - Button type
 * @param children - JSX Elements
 * @param variant - the button's variant (e.g. `correct`)
 * @param textColor - sets the text color
 * @param isDisabled - controls if the button is disabled or not
 * @param onClickHandle - onClick function handle
 */
const Button = ({
  type,
  children,
  variant,
  textColor,
  isDisabled,
  onClickHandle,
}: Props) => {
  return (
    <>
      <button
        type={type}
        className={`
        ${variant ? variant : ""}
        ${variant !== "disabled" ? textColor : "text-black"}
        ${
          variant !== "transparent" &&
          "border-black border-opacity-20 border-b-4"
        }
        h-11 w-full rounded-lg global-transition
        focus:ring-0 focus:outline-none active:border-b-0
      disabled:bg-disabled disabled:text-opacity-20 disabled:cursor-auto 
        `}
        disabled={isDisabled}
        onClick={onClickHandle}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
