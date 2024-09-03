import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSocket } from "../hooks/useSocket.ts";
import WaitRoom from "./WaitRoom";

export const User = () => {
  const [username, setUsername] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [code, setCode] = useState<number | null>(null);
  // const [storeInDB, setStoreInDB] = useState<boolean>(false);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "waiting_room":
          setJoined(true);
          break;
        case "quiz_exists":
          console.log("quiz exists");
          break;
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

  // useEffect(() => {}, [storeInDB]);

  const handleSubmit = (event: React.FormEvent) => {
    // if (storeInDB === false) setStoreInDB(true);

    // setStoreInDB(false);
    event.preventDefault();
    socket?.send(
      JSON.stringify({
        type: "player_joined",
        roomId: code,
        username: username,
      })
    );
  };

  if (!joined) {
    return (
      <div className=" flex items-center justify-center h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader className="text-center">
            <CardTitle className=" text-purple-600">Join Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="name"
                    placeholder="Enter your Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">RoomId</Label>
                  <Input
                    id="name"
                    placeholder="Enter the RoomId"
                    onChange={(e) => setCode(parseInt(e.target.value))}
                  />
                </div>
                <Button type="submit">Join Room</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <WaitRoom socket={socket} />;
};
