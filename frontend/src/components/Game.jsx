import { useEffect, useRef } from "react";
import Board from "./Board";

const Game = () => {
  const socketRef = useRef();

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    // console.log(wsUrl);
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("websocket connected");
    };

    socketRef.current.onmessage = (event) => {
      console.log("message from server ", event.data);
    };

    socketRef.current.onclose = (event) => {
      console.log("websocket closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const handleMoveSend = (message) => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: message }));
    }
  };

  return (
    <>
      <Board onMoveSend={handleMoveSend} />
    </>
  );
};

export default Game;
