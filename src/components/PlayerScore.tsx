import React from 'react';
import { X, Circle, Trophy } from 'lucide-react';
import { Player } from '../types';

interface PlayerScoreProps {
  player: Player;
  isActive: boolean;
}

export function PlayerScore({ player, isActive }: PlayerScoreProps) {
  return (
    <div className={`text-xl font-bold rounded-xl p-4 ${isActive ? 'bg-white/20 text-white' : 'text-white/80'} transition-all duration-300`}>
      <div className="flex items-center gap-2">
        {player.symbol === 'X' ? <X className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        {player.name}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Trophy className="w-5 h-5" />
        {player.score}
      </div>
    </div>
  );
}