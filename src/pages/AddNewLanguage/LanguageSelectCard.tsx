interface Props {
  id: string;
  flagPath: string;
  langName: string;
  isDisabled: boolean;
}

const LanguageSelectCard = ({ id, flagPath, langName, isDisabled }: Props) => {
  return (
    <>
      {!isDisabled ? (
        <div className="defaultBG w-36 h-44 relative flex-col justify-center items-center">
          <img
            src={`/assets/imgs/flags/${flagPath}`}
            alt={`${langName} Flag`}
            className="w-14 shadow-sm rounded-md border-black border border-opacity-10"
          />
          <h3 className="font-medium text-xl mt-2">{langName}</h3>
          <input
            type="radio"
            name="langSelect"
            id={id}
            className="border-transition"
            required
          />
        </div>
      ) : (
        <div className="bg-disabled flex items-center border-[1px] border-[#BCBCBC] border-opacity-20 shadow-sm rounded-lg p-3 w-36 h-44 relative flex-col justify-center">
          <img
            src={`/assets/imgs/flags/${flagPath}`}
            alt={`${langName} Flag`}
            className="w-14 shadow-sm rounded-md border-black border border-opacity-10 filter grayscale opacity-30"
          />
          <h3 className="font-medium text-xl mt-2 opacity-30">{langName}</h3>
          <input
            type="radio"
            name="langSelect"
            id={id}
            className="border-transition"
            required
            disabled
          />
        </div>
      )}
    </>
  );
};

export default LanguageSelectCard;
