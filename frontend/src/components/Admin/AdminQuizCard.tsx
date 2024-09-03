import { Button } from "../ui/button";
export type Props = {
  id: number | null;
  title: string | undefined;
  setRoomId: React.Dispatch<React.SetStateAction<number | null>>;
  socket: WebSocket | null;
};

export default function AdminQuizCard({ id, title, setRoomId, socket }: Props) {
  const handleJoin = () => {
    if (socket) {
      setRoomId(id);
      console.log("hello");
      socket?.send(
        JSON.stringify({
          type: "admin_joined",
          roomId: id,
        })
      );
    }
  };
  return (
    <div className=" flex flex-col my-5">
      <Button onClick={handleJoin}>{title}</Button>
    </div>
  );
}
