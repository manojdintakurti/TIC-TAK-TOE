import React from 'react';

interface PlayerFormProps {
  onSubmit: (player1Name: string, player2Name: string) => void;
}

export function PlayerForm({ onSubmit }: PlayerFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const player1Name = formData.get('player1') as string;
    const player2Name = formData.get('player2') as string;
    onSubmit(player1Name, player2Name);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-effect p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Tic Tac Toe
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="player1" className="block text-lg font-medium text-white">
              Player 1 Name (X)
            </label>
            <input
              type="text"
              id="player1"
              name="player1"
              required
              placeholder="Enter name..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="player2" className="block text-lg font-medium text-white">
              Player 2 Name (O)
            </label>
            <input
              type="text"
              id="player2"
              name="player2"
              required
              placeholder="Enter name..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white text-lg font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
}