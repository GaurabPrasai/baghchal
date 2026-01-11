const GameStatus = ({ gameState, moveHistory }) => {
  const getCurrentTurnDisplay = () => {
    if (gameState?.currentPlayer === "goat") {
      return `${gameState.player.goat || "Goat Player"}'s Turn`;
    } else {
      return `${gameState.player.tiger || "Tiger Player"}'s Turn`;
    }
  };

  const getPhaseDisplay = () => {
    switch (gameState?.phase) {
      case "placement":
        return "Placement Phase";
      case "movement":
        return "Movement Phase";
      default:
        return "Unknown Phase";
    }
  };

  return (
    <div className="h-32 lg:h-full flex flex-col p-3 lg:p-4 font-sans overflow-y-auto bg-[#262522] text-gray-200">
      {/* Game Statistics */}
      <div className="mb-4 lg:mb-6 flex-shrink-0">
        <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider mb-2 lg:mb-3 text-gray-400">
          Game Statistics
        </h3>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center py-1.5 lg:py-2 px-2  bg-[#2f2d2a] rounded-xl border border-[#3a3835]">
            <span className="text-xs lg:text-sm font-medium text-gray-300">
              Goats Remaining
            </span>
            <span className="font-extrabold text-sm lg:text-base text-green-400">
              {gameState?.unusedGoat || 0}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 lg:py-2 px-2 bg-[#2f2d2a] rounded-xl border border-[#3a3835]">
            <span className="text-xs lg:text-sm font-medium text-gray-300">
              Goats Captured
            </span>
            <span className="font-extrabold text-sm lg:text-base text-red-400">
              {gameState?.deadGoatCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="flex-1 min-h-0">
        <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider mb-2 lg:mb-3 text-gray-400">
          Move History
        </h3>

        <div className="bg-[#2f2d2a] rounded-xl p-2 lg:p-3 h-full overflow-hidden flex flex-col border border-[#3a3835]">
          {!moveHistory || moveHistory.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 text-xs lg:text-sm">No moves yet</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-1 lg:space-y-2">
              {moveHistory.map((move, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-1 lg:py-2 px-2 lg:px-3 bg-[#262522] rounded-lg border border-[#3a3835] text-xs lg:text-sm"
                >
                  <span className="font-semibold text-gray-500 text-xs">
                    #{index + 1}
                  </span>

                  <span className="capitalize font-bold text-white">
                    {move.player}
                  </span>

                  <span className="text-gray-400 font-medium">{move.type}</span>

                  <span className="text-gray-500 text-xs font-light">
                    {move.from} → {move.to}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStatus;
