import React from 'react';
import { RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onResetGame: () => void;
  onResetScores: () => void;
}

export function GameControls({ onResetGame, onResetScores }: GameControlsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onResetGame}
        className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <RotateCcw className="w-5 h-5" />
        Play Again
      </button>
      <button
        onClick={onResetScores}
        className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
      >
        Reset Scores
      </button>
    </div>
  );
}