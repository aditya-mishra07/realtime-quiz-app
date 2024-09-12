type cardButtonProps = {
  isClicked: boolean;
  onClick: () => void;
  title: string;
};

const CardButton = ({ onClick, isClicked, title }: cardButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center max-w-sm rounded-lg shadow-lg p-6 bg-white w-full text-center text-black ${
        isClicked ? " bg-lime-500" : null
      }`}
      onClick={onClick}
    >
      {" "}
      {title}
    </button>
  );
};
export default CardButton;
