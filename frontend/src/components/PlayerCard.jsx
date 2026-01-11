const PlayerCard = ({ username, goatPlayer, tigerPlayer, currentPlayer }) => {
  const isPlayerTurn = currentPlayer === username;

  const isPlayerGoat = goatPlayer === username;

  const playerLabel = `You ${isPlayerGoat ? "(🐐)" : "(🐅)"}`;
  const opponentLabel = `${
    isPlayerGoat ? tigerPlayer + "(🐅)" : goatPlayer + "(🐐)"
  }`;
  return (
    <div
      className={`
        px-4 py-2 rounded-lg border-2 transition-all
        max-w-md mx-auto w-full text-center
        ${
          isPlayerTurn
            ? isPlayerGoat
              ? "border-[#4ade80] bg-[#44b16c] text-white -lg "
              : "border-[#f95e5e] bg-[#f95e5e] text-white -lg "
            : "border-[#3a3835] bg-[#262522] text-gray-200"
        }
      `}
    >
      {/* Matchup */}
      <div className="text-sm font-extrabold truncate">
        {playerLabel} <span className="opacity-70">VS</span> {opponentLabel}
      </div>

      {/* Turn status */}
      <div
        className={`
          text-xs font-bold uppercase tracking-wide mt-1
          ${isPlayerTurn ? "text-white" : "text-gray-400"}
        `}
      >
        {isPlayerTurn ? "Your turn!" : "Opponent’s turn"}
      </div>
    </div>
  );
};

export default PlayerCard;
