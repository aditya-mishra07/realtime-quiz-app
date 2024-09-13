import WebSocketService from "@/classes/WebSocketService";
import { useEffect, useRef, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = WebSocketService.getInstance();
    setSocket(ws);

    // Clean up function
    return () => {
      if (ws.readyState === 1) {
        ws.close();
      }
    };
  }, []);

  return socket;
};
