import { useState, useEffect, useRef } from "react";
import Board from "./Board";

const Game = () => {
  const socketRef = useRef();
  const [gameState, setGameState] = useState();

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("websocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const new_game_state = JSON.parse(event.data).message.game_state;
      console.log(new_game_state);
      setGameState(new_game_state);
    };

    socketRef.current.onclose = () => {
      console.log("websocket closed");
    };

    return () => {
      socketRef.current.close();
    };
  }, []); // 🧠 Don't forget the closing ] here

  const handleMoveSend = (message) => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      console.log("sending move ", message);
      socketRef.current.send(JSON.stringify({ message }));
    }
  };

  return (
    <>
      {gameState && (
        <Board
          board={gameState.board}
          currentPlayer={gameState.currentPlayer} // or gameState.currentPlayer if your backend uses that
          phase={gameState.phase} // or gameState.phase if your backend uses that
          onMoveSend={handleMoveSend}
        />
      )}
    </>
  );
};

export default Game;
