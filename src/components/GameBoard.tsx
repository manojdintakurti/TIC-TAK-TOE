import React from 'react';
import { X, Circle } from 'lucide-react';

interface GameBoardProps {
  board: (string | null)[];
  onMove: (index: number) => void;
  disabled: boolean;
}

export function GameBoard({ board, onMove, disabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-8">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onMove(index)}
          className={`w-24 h-24 flex items-center justify-center rounded-xl transition-all duration-300
            ${!cell && !disabled ? 'hover:bg-white/30 bg-white/10' : 'bg-white/20'} 
            ${cell || disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            transform hover:scale-105`}
          disabled={!!cell || disabled}
        >
          {cell === 'X' && <X className="w-16 h-16 text-white" />}
          {cell === 'O' && <Circle className="w-16 h-16 text-white" />}
        </button>
      ))}
    </div>
  );
}