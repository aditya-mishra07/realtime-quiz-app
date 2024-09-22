import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/Question/QuestionCard";
import { Question, Submission, User } from "@/types";
import { useEffect, useState } from "react";
import CardButton from "@/components/Question/CardButton";
import SubmittedLoading from "@/components/Loading/SubmittedLoading";
import Wrong from "./Wrong";
import Right from "./Right";

type questionProps = {
  question: Question | null;
  userId?: string;
  roomId: string | null;
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

  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const [isCorrect, setisCorrect] = useState<boolean | null>(null);
  const [userinfo, setUserInfo] = useState<User | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  useEffect(() => {
    setTimeout(() => {
      if (!submitted) {
        console.log("not submitted!");
        socket?.send(
          JSON.stringify({
            type: "not_submitted",
            submission: submission,
            roomId: roomId,
            userId,
          })
        );
      }
      setTimeOver(true);
    }, 30000);
  }, []);

  useEffect(() => {
    if (selected !== null && submitted) {
      socket?.send(
        JSON.stringify({
          type: "submit",
          submission: submission,
          roomId: roomId,
          userId: userId,
        })
      );
    }
  }, [submission, socket]);

  useEffect(() => {
    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "result") {
        if (message.result.userinfo.streak.length > 0) {
          setisCorrect(true);
          setUserInfo(message.result.userinfo);
          setPosition(message.result.position);
        } else {
          setisCorrect(false);
          setUserInfo(message.result.userinfo);
          setPosition(message.result.position);
        }
      }
    };
    socket?.addEventListener("message", handleSocketMessage);
    return () => {
      socket?.removeEventListener("message", handleSocketMessage);
    };
  }, [socket, timeOver]);

  const handleClick = (index: number) => {
    setClickedStates((prevStates) =>
      prevStates.map((_, i) => (i === index ? !prevStates[index] : false))
    );
    switch (index) {
      case 0:
        setSelected("ONE");
        break;
      case 1:
        setSelected("TWO");
        break;
      case 2:
        setSelected("THREE");
        break;
      case 3:
        setSelected("FOUR");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmission((prevSubmission) => ({
        ...prevSubmission,
        optionSelected: selected,
      }));
      setSubmitted(true);
    } else {
      //TODO POPUP
    }
  };

  if (!submitted && !timeOver) {
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

  if (submitted && !timeOver) {
    return (
      <div className=" flex items-center h-screen justify-center w-full">
        <SubmittedLoading />
      </div>
    );
  }
  if (submitted && timeOver && position && userinfo) {
    return (
      <>
        {isCorrect ? (
          <>
            <Right
              position={position}
              userinfo={userinfo}
              socket={socket}
              roomId={roomId}
              userId={userId}
            />
          </>
        ) : (
          <Wrong
            position={position}
            userId={userId}
            roomId={roomId}
            socket={socket}
          />
        )}
      </>
    );
  }

  if (!submitted && timeOver && position) {
    return (
      <Wrong
        position={position}
        userId={userId}
        roomId={roomId}
        socket={socket}
      />
    );
  }
}
