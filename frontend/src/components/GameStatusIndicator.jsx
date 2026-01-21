import { useEffect, useRef } from "react";

const GameStatusIndicator = ({ gameState, moveHistory }) => {
  const historyContainerRef = useRef(null);

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop =
        historyContainerRef.current.scrollHeight;
    }
  }, [moveHistory]);

  return (
    <div className="h-32 lg:h-full flex flex-col p-3 lg:p-4 font-sans bg-bg-dark text-text-light overflow-auto">
      {/* Game Statistics */}
      <div className="mb-4 lg:mb-6 flex-shrink-0">
        <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider mb-2 lg:mb-3 text-text-muted">
          Game Statistics
        </h3>

        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-between items-center py-1.5 lg:py-2 px-2 bg-bg-surface rounded-xl border border-border-muted">
            <span className="text-xs lg:text-sm font-medium text-text-light">
              Goats Remaining
            </span>
            <span className="font-extrabold text-sm lg:text-base text-success">
              {gameState?.unusedGoat || 0}
            </span>
          </div>

          <div className="flex justify-between items-center py-1.5 lg:py-2 px-2 bg-bg-surface rounded-xl border border-border-muted">
            <span className="text-xs lg:text-sm font-medium text-text-light">
              Goats Captured
            </span>
            <span className="font-extrabold text-sm lg:text-base text-error">
              {gameState?.deadGoatCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Move History */}
      <div className="mb-4 lg:mb-6 flex flex-col flex-1 min-h-0">
        <h3 className="text-xs lg:text-sm font-semibold uppercase tracking-wider mb-2 lg:mb-3 text-text-muted">
          Move History
        </h3>

        <div className="flex-1 flex flex-col min-h-10 bg-bg-darker rounded-xl border border-border-muted overflow-hidden">
          {!moveHistory || moveHistory.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-0">
              <p className="text-text-muted text-xs lg:text-sm">No moves yet</p>
            </div>
          ) : (
            <div
              ref={historyContainerRef}
              className="flex-1 overflow-y-auto space-y-2 min-h-0 p-2"
            >
              {moveHistory.map((move, index) => (
                <div
                  key={index}
                  className="px-2 py-1 lg:py-2 bg-bg-dark rounded-lg border border-border-muted text-xs lg:text-sm text-text-light"
                >
                  <span className="text-text-muted mr-2">{index + 1}.</span>
                  <span>{move}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameStatusIndicator;
