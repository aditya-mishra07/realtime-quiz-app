import { Quiz } from "@/types";
import { Button } from "../ui/button";
export type Props = {
  id: number | null;
  title: string | undefined;
  setAdminJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  socket: WebSocket | null;
};

export default function AdminQuizCard({
  id,
  title,
  setAdminJoined,
  setRoomId,
  socket,
}: Props) {
  const handleJoin = () => {
    setRoomId(id);
    setAdminJoined(true);
    socket?.send(
      JSON.stringify({
        type: "admin_joined",
      })
    );
  };
  return (
    <div className=" flex flex-col my-5">
      <Button onClick={handleJoin}>{title}</Button>
    </div>
  );
}
