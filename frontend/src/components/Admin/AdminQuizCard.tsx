import { Button } from "../ui/button";

export type Props = {
  title: string | undefined;
  setAdminJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AdminQuizCard({ title, setAdminJoined }: Props) {
  const handleJoin = () => {
    setAdminJoined(true);
  };
  return (
    <div className=" flex flex-col my-5">
      <Button onClick={handleJoin}>{title}</Button>
    </div>
  );
}
