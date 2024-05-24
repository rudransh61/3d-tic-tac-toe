import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TicTacToe3D from './TicTacToe3D';
import TicTacToeFlat from './TicTacToeFlat';

function App() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
        <div className="w-full md:w-3/4 h-96 md:h-full md:block">
          <Canvas className="w-full h-full">
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={0.5} />
            <TicTacToe3D key={key} />
          </Canvas>
        </div>
        {/* <div className="w-full md:w-3/4 h-96 md:h-full block md:hidden">
          <TicTacToeFlat key={key} />
        </div> */}
        <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-1/4 text-center bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <p className="mb-2">1. Tap a box to make a move.</p>
          <p className="mb-2">2. Get three in a row to win.</p>
          <p className="mb-2">3. The game alternates between X and O.</p>
          <p className="mb-2">4. Tap "Restart Game" to play again.</p>
          <button
            onClick={() => setKey(prevKey => prevKey + 1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
