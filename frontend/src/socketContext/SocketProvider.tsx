import {
  useEffect,
  useRef,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface ISocketProvider {
  children: ReactNode;
}

// Create context for WebSocket
const SocketContext = createContext<WebSocket | null>(null);

// Custom hook to use WebSocket context
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: ISocketProvider) => {
  const [ws, setWS] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket instance
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      const socket = new WebSocket("ws://localhost:8008");
      wsRef.current = socket;
      setWS(socket);
    }

    // Function to handle WebSocket events
    const handleOpen = () => {
      console.log("WebSocket connection established");
    };

    const handleClose = () => {
      console.log("WebSocket connection closed");
    };

    // Error handling if needed
    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    // Add event listeners
    if (wsRef.current) {
      wsRef.current.addEventListener("open", handleOpen);
      wsRef.current.addEventListener("close", handleClose);
      wsRef.current.addEventListener("error", handleError);
    }

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (wsRef.current) {
        wsRef.current.removeEventListener("open", handleOpen);
        wsRef.current.removeEventListener("close", handleClose);
        wsRef.current.removeEventListener("error", handleError);

        if (wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.close();
        }
      }
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  return <SocketContext.Provider value={ws}>{children}</SocketContext.Provider>;
};
