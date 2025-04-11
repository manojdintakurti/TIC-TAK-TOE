import React from 'react';
import { Player } from '../types';

interface GameStatusProps {
  winner: Player | null;
  isDraw: boolean;
  currentPlayer: Player;
}

export function GameStatus({ winner, isDraw, currentPlayer }: GameStatusProps) {
  if (winner) {
    return (
      <p className="text-2xl font-bold text-white animate-bounce">
        🎉 {winner.name} wins! 🎉
      </p>
    );
  }

  if (isDraw) {
    return (
      <p className="text-2xl font-bold text-white">
        It's a draw! 🤝
      </p>
    );
  }

  return (
    <p className="text-xl text-white">
      {currentPlayer.name}'s turn ({currentPlayer.symbol})
    </p>
  );
}