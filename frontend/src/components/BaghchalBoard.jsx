import React from "react";
import "./BaghChalBoard.css";
import Node from "./Node";

const BaghChalBoard = () => {
  const boardSize = 4; // 5x5 grid (0-4 indices)
  const cellSize = 160;
  const padding = 30;
  const pointRadius = 25;
  const svgSize = padding * 2 + boardSize * cellSize;

  // Generate grid lines (horizontal and vertical)
  const renderGridLines = () => {
    const lines = [];

    // Horizontal lines
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

    // Vertical lines
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

  // Generate diagonal lines
  const renderDiagonalLines = () => {
    const lines = [];
    const startX = padding;
    const startY = padding;
    const endX = padding + boardSize * cellSize;
    const endY = padding + boardSize * cellSize;
    const centerX = padding + 2 * cellSize;
    const centerY = padding + 2 * cellSize;

    // Main diagonals (full board)
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

    // Quadrant diagonals
    const quadrants = [
      { x1: startX, y1: startY, x2: centerX, y2: centerY }, // Top-left
      { x1: centerX, y1: startY, x2: endX, y2: centerY }, // Top-right
      { x1: startX, y1: centerY, x2: centerX, y2: endY }, // Bottom-left
      { x1: centerX, y1: centerY, x2: endX, y2: endY }, // Bottom-right
    ];

    quadrants.forEach((quad, index) => {
      // Diagonal from top-left to bottom-right of quadrant
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

      // Diagonal from top-right to bottom-left of quadrant
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

  // Generate intersection points
  const renderNodes = () => {
    const nodes = [];
    for (let row = 0; row <= boardSize; row++) {
      for (let col = 0; col <= boardSize; col++) {
        const x = padding + col * cellSize;
        const y = padding + row * cellSize;
        const nodeKey = `${row}-${col}`;
        // const pieceType = gameState.board[nodeKey] || null;
        const pieceType = null;

        nodes.push(
          <Node
            key={nodeKey}
            x={x}
            y={y}
            row={row}
            col={col}
            radius={pointRadius}
            pieceType={pieceType}
            // isSelected={gameState.selectedNode === nodeKey}
            // isHighlighted={gameState.highlightedNodes.includes(nodeKey)}
            // onClick={handleNodeClick}
            // onHover={handleNodeHover}
          />
        );
      }
    }

    return nodes;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Bagh Chal</h1>

      <div className="bg-white border-2 border-gray-600 rounded-lg p-5 shadow-lg">
        <svg width={svgSize} height={svgSize} className="bg-white">
          {/* Grid lines */}
          <g>{renderGridLines()}</g>

          {/* Diagonal lines */}
          <g>{renderDiagonalLines()}</g>

          {/* Intersection points */}
          <g>{renderNodes()}</g>
        </svg>
      </div>

      {/* <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">Traditional Nepali Board Game</p>
        <p className="text-xs">25 Points • 4 Tigers vs 20 Goats</p>
      </div> */}
    </div>
  );
};

export default BaghChalBoard;
