import React, { useState } from 'react';

const TicTacToe3DFlat = () => {
  const [boards, setBoards] = useState(Array(3).fill(Array(9).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameActive, setIsGameActive] = useState(true);

  const handleCellClick = (boardIndex, cellIndex) => {
    if (!isGameActive || boards[boardIndex][cellIndex]) return;

    const newBoards = [...boards];
    const newBoard = [...newBoards[boardIndex]];
    newBoard[cellIndex] = currentPlayer;
    newBoards[boardIndex] = newBoard;
    setBoards(newBoards);

    if (checkWin(newBoard)) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
      setIsGameActive(false);
    } else if (newBoard.every(cell => cell)) {
      setTimeout(() => alert('It\'s a draw!'), 100);
      setIsGameActive(false);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = (grid) => {
    const winningCombinations = getWinningCombinations();
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return grid[a] && grid[a] === grid[b] && grid[a] === grid[c];
    });
  };

  const getWinningCombinations = () => [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full">
      {boards.map((board, boardIndex) => (
        <div key={boardIndex} className="flex flex-wrap justify-center">
          {board.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              onClick={() => handleCellClick(boardIndex, cellIndex)}
              className="w-16 h-16 bg-white text-black text-2xl flex items-center justify-center hover:bg-blue-100 transition"
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TicTacToe3DFlat;
