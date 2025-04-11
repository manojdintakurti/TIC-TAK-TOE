import React, { useState } from 'react';
import { PlayerForm } from './components/PlayerForm';
import { PlayerScore } from './components/PlayerScore';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { GameControls } from './components/GameControls';
import { Player } from './types';

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

  const handleStartGame = (player1Name: string, player2Name: string) => {
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
    return <PlayerForm onSubmit={handleStartGame} />;
  }

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass-effect p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8 gap-8">
          <PlayerScore player={players![0]} isActive={currentPlayer === 0} />
          <PlayerScore player={players![1]} isActive={currentPlayer === 1} />
        </div>

        <GameBoard
          board={board}
          onMove={handleMove}
          disabled={!!winner || isDraw}
        />

        <div className="text-center mb-6">
          <GameStatus
            winner={winner}
            isDraw={isDraw}
            currentPlayer={players![currentPlayer]}
          />
        </div>

        <GameControls
          onResetGame={resetGame}
          onResetScores={resetScores}
        />
      </div>
    </div>
  );
}

export default App;