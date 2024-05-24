import React, { useState } from 'react';
import * as THREE from 'three';

const TicTacToe3D = () => {
  const [grid, setGrid] = useState(Array(27).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [isGameActive, setIsGameActive] = useState(true);
  const [hovered, setHovered] = useState(null);

  const handleCellClick = (index) => {
    if (!isGameActive || grid[index]) return;

    const newGrid = [...grid];
    newGrid[index] = currentPlayer;
    setGrid(newGrid);

    if (checkWin(newGrid)) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 100);
      setIsGameActive(false);
    } else if (newGrid.every(cell => cell)) {
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

  const getWinningCombinations = () => {
    const lines = [];
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 3; y++) {
        lines.push([z * 9 + y * 3 + 0, z * 9 + y * 3 + 1, z * 9 + y * 3 + 2]);
        lines.push([z * 9 + 0 * 3 + y, z * 9 + 1 * 3 + y, z * 9 + 2 * 3 + y]);
      }
      lines.push([z * 9 + 0, z * 9 + 4, z * 9 + 8]);
      lines.push([z * 9 + 2, z * 9 + 4, z * 9 + 6]);
    }
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        lines.push([0 * 9 + y * 3 + x, 1 * 9 + y * 3 + x, 2 * 9 + y * 3 + x]);
      }
      lines.push([0 * 9 + x * 3 + 0, 1 * 9 + x * 3 + 1, 2 * 9 + x * 3 + 2]);
      lines.push([0 * 9 + x * 3 + 2, 1 * 9 + x * 3 + 1, 2 * 9 + x * 3 + 0]);
    }
    lines.push([0, 13, 26]);
    lines.push([2, 13, 24]);
    lines.push([6, 13, 20]);
    lines.push([8, 13, 18]);

    return lines;
  };

  return (
    <group>
      {[...Array(3)].map((_, z) =>
        [...Array(3)].map((_, y) =>
          [...Array(3)].map((_, x) => {
            const index = z * 9 + y * 3 + x;
            const isHovered = index === hovered;
            return (
              <mesh
                key={index}
                position={[x * 2 - 2, y * 2 - 2, z * -2 + 2]}
                onClick={() => handleCellClick(index)}
                onPointerOver={() => setHovered(index)}
                onPointerOut={() => setHovered(null)}
                scale={isHovered ? 1.1 : 1}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                  emissive={isHovered ? new THREE.Color(0x00ff00) : new THREE.Color(0x000000)}
                  emissiveIntensity={isHovered ? 0.6 : 0}
                  color={grid[index] === 'X' ? '#ffcccc' : grid[index] === 'O' ? '#ccccff' : '#f0f0f0'}
                />
              </mesh>
            );
          })
        )
      )}
    </group>
  );
};

export default TicTacToe3D;
