import React, { useState } from "react";
import Piece from "./Piece";
import ValidateMove from "./utilities/MoveValidation.js";

const Board = ({ board, currentPlayer, phase, onMoveSend }) => {
  const boardSize = 4;
  const cellSize = 180;
  const pieceRadius = 40;
  const padding = pieceRadius + 1;
  const svgSize = padding * 2 + boardSize * cellSize;

  const [boardState, setboardState] = useState({
    selectedPiece: null,
    activePiece: null, // this is the non-null piece clicked before clicking a null piece
    // highlightedPieces: [],
  });

  // handle piece clicks
  const handlePieceClick = (row, col, pieceType) => {
    const pieceKey = `${row}-${col}`;
    handleSelection(row, col, pieceType);

    const fromKey = boardState.activePiece;
    const toKey = pieceKey;
    const moveType =
      ValidateMove(fromKey, toKey, board[boardState.activePiece], board) ||
      (phase == "placement" && !board[pieceKey] && currentPlayer == "goat"
        ? "place"
        : "");
    // console.log(phase, !board[pieceKey], currentPlayer);

    if (moveType) {
      const message = {
        moveType: moveType,
        currentPlayer: currentPlayer,
        pieceType: board[boardState.activePiece], // it's null in placement phase
        fromKey: fromKey,
        toKey: toKey,
      };
      setboardState((prev) => ({
        ...prev,
        selectedPiece: null,
        activePiece: null,
      }));
      onMoveSend(message); // send move to server
    }
  };

  // handle hover (currently unused, reserved for future use)
  const handlePieceHover = (row, col, isEntering) => {
    console
      .log
      // `${isEntering ? "Entering" : "Leaving"} Piece at (${row}, ${col})`
      ();
  };

  // draw grid lines
  const renderGridLines = () => {
    const lines = [];
    for (let row = 0; row <= boardSize; row++) {
      const y = padding + row * cellSize;
      lines.push(
        <line
          key={`h-${row}`}
          x1={padding}
          y1={y}
          x2={padding + boardSize * cellSize}
          y2={y}
          className="stroke-gray-400"
          style={{ strokeWidth: 1.5 }}
        />
      );
    }
    for (let col = 0; col <= boardSize; col++) {
      const x = padding + col * cellSize;
      lines.push(
        <line
          key={`v-${col}`}
          x1={x}
          y1={padding}
          x2={x}
          y2={padding + boardSize * cellSize}
          className="stroke-gray-500 stroke-[1.5]"
        />
      );
    }
    return lines;
  };

  // draw diagonals
  const renderDiagonalLines = () => {
    const lines = [];
    const startX = padding;
    const startY = padding;
    const endX = padding + boardSize * cellSize;
    const endY = padding + boardSize * cellSize;
    const centerX = padding + 2 * cellSize;
    const centerY = padding + 2 * cellSize;

    // main diagonals
    lines.push(
      <line
        key="main-diag-1"
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        className="stroke-gray-500 stroke-[1.5]"
      />
    );
    lines.push(
      <line
        key="main-diag-2"
        x1={endX}
        y1={startY}
        x2={startX}
        y2={endY}
        className="stroke-gray-500 stroke-[1.5]"
      />
    );

    // quadrant diagonals
    const quadrants = [
      { x1: startX, y1: startY, x2: centerX, y2: centerY },
      { x1: centerX, y1: startY, x2: endX, y2: centerY },
      { x1: startX, y1: centerY, x2: centerX, y2: endY },
      { x1: centerX, y1: centerY, x2: endX, y2: endY },
    ];

    quadrants.forEach((quad, index) => {
      lines.push(
        <line
          key={`quad-diag-1-${index}`}
          x1={quad.x1}
          y1={quad.y1}
          x2={quad.x2}
          y2={quad.y2}
          className="stroke-gray-500 stroke-[1.5]"
        />
      );
      lines.push(
        <line
          key={`quad-diag-2-${index}`}
          x1={quad.x2}
          y1={quad.y1}
          x2={quad.x1}
          y2={quad.y2}
          className="stroke-gray-500 stroke-[1.5]"
        />
      );
    });

    return lines;
  };

  // render all the pieces on board
  const renderPieces = () => {
    const pieces = [];
    for (let row = 0; row <= boardSize; row++) {
      for (let col = 0; col <= boardSize; col++) {
        const x = padding + col * cellSize;
        const y = padding + row * cellSize;
        const pieceKey = `${row}-${col}`;
        const pieceType = board[pieceKey] || null;

        pieces.push(
          <Piece
            key={pieceKey}
            x={x}
            y={y}
            row={row}
            col={col}
            radius={pieceRadius}
            pieceType={pieceType}
            isSelected={boardState.selectedPiece === pieceKey}
            onClick={handlePieceClick}
            onHover={handlePieceHover}
          />
        );
      }
    }
    return pieces;
  };

  // handle selection logic (clicking same piece twice deselects, etc.)
  const handleSelection = (row, col, pieceType) => {
    const pieceKey = `${row}-${col}`;

    const isValidSelection = (pieceKey, pieceType) => {
      // goat logic
      if (currentPlayer === "goat") {
        if (phase === "placement" && pieceType === null) {
          return true;
        } else if (phase === "displacement" && pieceType == "goat") {
          setboardState((prev) => ({ ...prev, activePiece: pieceKey }));
          return true;
        } else if (
          phase == "displacement" &&
          board[boardState.activePiece] === "goat" &&
          !pieceType
        ) {
          return true;
        }
      }
      // tiger logic
      if (currentPlayer === "tiger") {
        if (pieceType === "tiger") {
          setboardState((prev) => ({ ...prev, activePiece: pieceKey }));
          return true;
        } else if (!pieceType && board[boardState.activePiece] === "tiger") {
          return true;
        }
      }
      return false;
    };

    if (isValidSelection(pieceKey, pieceType)) {
      if (boardState.selectedPiece === pieceKey) {
        setboardState((prev) => ({
          ...prev,
          selectedPiece: null,
          activePiece: null,
        }));
        console.log(
          `disselected Piece at (${row}, ${col}) with piece: ${pieceType}`
        );
      } else {
        setboardState((prev) => ({
          ...prev,
          selectedPiece: pieceKey,
        }));
        console.log(
          `selected Piece at (${row}, ${col}) with piece: ${pieceType}`
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-5">
      <div className="bg-white border-2 border-gray-600 rounded-lg p-5 shadow-lg">
        <svg width={svgSize} height={svgSize} className="bg-white">
          <g>{renderGridLines()}</g>
          <g>{renderDiagonalLines()}</g>
          <g>{renderPieces()}</g>
        </svg>
      </div>
    </div>
  );
};

export default Board;
