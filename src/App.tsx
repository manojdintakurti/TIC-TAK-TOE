import React, { useState } from 'react';
import { X, Circle, RotateCcw, Trophy } from 'lucide-react';

type Player = {
  name: string;
  score: number;
  symbol: 'X' | 'O';
};

function App() {
  const [players, setPlayers] = useState<[Player, Player] | null>(null);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<0 | 1>(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const handleStartGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const player1Name = formData.get('player1') as string;
    const player2Name = formData.get('player2') as string;

    setPlayers([
      { name: player1Name, score: 0, symbol: 'X' },
      { name: player2Name, score: 0, symbol: 'O' }
    ]);
    setGameStarted(true);
  };

  const checkWinner = (boardState: (string | null)[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return players![currentPlayer];
      }
    }
    return null;
  };

  const handleMove = (index: number) => {
    if (board[index] || winner || !players || isDraw) return;

    const newBoard = [...board];
    newBoard[index] = players[currentPlayer].symbol;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setPlayers(prev => {
        if (!prev) return prev;
        const newPlayers = [...prev] as [Player, Player];
        newPlayers[currentPlayer].score += 1;
        return newPlayers;
      });
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
    setCurrentPlayer(0);
  };

  const resetScores = () => {
    setPlayers(prev => {
      if (!prev) return prev;
      return [
        { ...prev[0], score: 0 },
        { ...prev[1], score: 0 }
      ];
    });
    resetGame();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <div className="glass-effect p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">
            Tic Tac Toe
          </h1>
          <form onSubmit={handleStartGame} className="space-y-6">
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

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-effect p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8 gap-8">
          <div className={`text-xl font-bold rounded-xl p-4 ${currentPlayer === 0 ? 'bg-white/20 text-white' : 'text-white/80'} transition-all duration-300`}>
            <div className="flex items-center gap-2">
              <X className="w-6 h-6" />
              {players![0].name}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="w-5 h-5" />
              {players![0].score}
            </div>
          </div>
          <div className={`text-xl font-bold rounded-xl p-4 ${currentPlayer === 1 ? 'bg-white/20 text-white' : 'text-white/80'} transition-all duration-300`}>
            <div className="flex items-center gap-2">
              <Circle className="w-6 h-6" />
              {players![1].name}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Trophy className="w-5 h-5" />
              {players![1].score}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleMove(index)}
              className={`w-24 h-24 flex items-center justify-center rounded-xl transition-all duration-300
                ${!cell && !winner && !isDraw 
                  ? 'hover:bg-white/30 bg-white/10' 
                  : 'bg-white/20'} 
                ${cell ? 'cursor-not-allowed' : 'cursor-pointer'}
                transform hover:scale-105`}
              disabled={!!cell || !!winner || isDraw}
            >
              {cell === 'X' && <X className="w-16 h-16 text-white" />}
              {cell === 'O' && <Circle className="w-16 h-16 text-white" />}
            </button>
          ))}
        </div>

        <div className="text-center mb-6">
          {winner && (
            <p className="text-2xl font-bold text-white animate-bounce">
              🎉 {winner.name} wins! 🎉
            </p>
          )}
          {isDraw && (
            <p className="text-2xl font-bold text-white">
              It's a draw! 🤝
            </p>
          )}
          {!winner && !isDraw && (
            <p className="text-xl text-white">
              {players![currentPlayer].name}'s turn ({players![currentPlayer].symbol})
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={resetGame}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
          <button
            onClick={resetScores}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;