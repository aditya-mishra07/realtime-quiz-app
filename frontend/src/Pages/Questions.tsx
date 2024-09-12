import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/Question/QuestionCard";
import { Answer, Question, Submission } from "@/types";
import { useEffect, useState } from "react";
import CardButton from "@/components/Question/cardButton";

type questionProps = {
  question: Question | null;
  userId?: string;
  roomId: number | null;
  socket: WebSocket | null;
};

export default function Questions({
  question,
  userId,
  roomId,
  socket,
}: questionProps) {
  const [clickedStates, setClickedStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [submission, setSubmission] = useState<Submission>({
    userId: userId,
    questionId: question?.id,
  });

  const [selected, setSelected] = useState<Answer | null>(null);

  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (selected && submitted) {
      socket?.send(
        JSON.stringify({
          type: "submit",
          submission: submission,
        })
      );
    }
  }, [submission, socket]);

  const handleClick = (index: number) => {
    setClickedStates((prevStates) =>
      prevStates.map((_, i) => (i === index ? !prevStates[index] : false))
    );
    switch (index) {
      case 0:
        setSelected(Answer.ONE);
        break;
      case 1:
        setSelected(Answer.TWO);
        break;
      case 2:
        setSelected(Answer.THREE);
        break;
      case 3:
        setSelected(Answer.FOUR);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (selected) {
      setSubmission((prevSubmission) => ({
        ...prevSubmission,
        optionSelected: selected,
      }));
      setSubmitted(true);
    } else {
      //TODO POPUP
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="mx-4 my-2">
        <QuestionCard title={question?.text} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 p-6 m-20 mx-60">
        {question?.options.map((option, index) => (
          <CardButton
            key={index}
            isClicked={clickedStates[index]}
            onClick={() => handleClick(index)}
            title={option.text}
          />
        ))}
      </div>
      <div className=" flex justify-center mr-12">
        <Button className=" w-[350px]" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
