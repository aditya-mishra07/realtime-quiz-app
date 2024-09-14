import { BiSquare } from "react-icons/bi";
import { BiCheckSquare } from "react-icons/bi";

type cardButtonProps = {
  isClicked: boolean;
  onClick: () => void;
  title: string;
};

const CardButton = ({ onClick, isClicked, title }: cardButtonProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`flex items-center justify-center max-w-sm rounded-sm shadow-lg p-3 bg-white w-full text-center text-black cursor-pointer`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <div className="flex">
        <h4 className="text-lg">{title}</h4>
        {isClicked ? (
          <BiCheckSquare className=" ml-48" color="purple" size={"36px"} />
        ) : (
          <BiSquare color="purple" className=" ml-48" size={"36px"} />
        )}
      </div>
    </div>
  );
};
export default CardButton;
