import { useState } from "react";

// Node Component - handles individual board positions
const Node = ({
  x,
  y,
  row,
  col,
  radius,
  pieceType = null, // 'tiger', 'goat', or null
  isSelected = false,
  isHighlighted = false,
  onClick,
  onHover,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(row, col, pieceType);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover(row, col, true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) {
      onHover(row, col, false);
    }
  };

  // Circle styles based on state
  const getCircleStyle = () => {
    let fill = "white";
    let stroke = "#666";
    let strokeWidth = 2;

    if (isSelected) {
      stroke = "#3b82f6"; // blue
      strokeWidth = 3;
    } else if (isHighlighted) {
      stroke = "#10b981"; // green
      strokeWidth = 3;
    } else if (isHovered) {
      fill = "#f3f4f6";
    }

    return {
      fill,
      stroke,
      strokeWidth,
      cursor: "pointer",
    };
  };

  // Render piece image if present
  const renderPiece = () => {
    if (!pieceType) return null;

    const imageSize = radius * 1.5; // Make image slightly larger than circle
    const imageX = x - imageSize / 2;
    const imageY = y - imageSize / 2;

    // For now, using placeholder colored circles, but you can replace with actual images
    if (pieceType === "tiger") {
      return (
        <g>
          {/* Tiger placeholder - orange circle with stripes */}
          <circle
            cx={x}
            cy={y}
            r={radius - 2}
            fill="#ff8c00"
            stroke="#ff4500"
            strokeWidth={2}
          />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="white"
          >
            T
          </text>
        </g>
      );
    } else if (pieceType === "goat") {
      return (
        <g>
          {/* Goat placeholder - light brown circle */}
          <circle
            cx={x}
            cy={y}
            r={radius - 2}
            fill="#deb887"
            stroke="#8b7355"
            strokeWidth={2}
          />
          <text
            x={x}
            y={y + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#654321"
          >
            G
          </text>
        </g>
      );
    }

    // If you want to use actual images instead:
    /*
    return (
      <image
        x={imageX}
        y={imageY}
        width={imageSize}
        height={imageSize}
        href={pieceType === 'tiger' ? '/tiger.png' : '/goat.png'}
        style={{ pointerEvents: 'none' }}
      />
    );
    */
  };

  return (
    <g>
      {/* Base circle */}
      <circle
        cx={x}
        cy={y}
        r={radius}
        style={getCircleStyle()}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-row={row}
        data-col={col}
      />

      {/* Piece (tiger or goat) */}
      {renderPiece()}
    </g>
  );
};

export default Node;
