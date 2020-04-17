import React, { useState } from 'react';
import { generateSquares } from './components/GenerateSquares'
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


const App = () => {

  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [filledSquareCount, setFilledSquareCount] = useState(0);
  const [winner, setWinner] = useState(null);
  

  // Wave 2
  // You will need to create a method to change the square 
  // When it is clicked on.
  // Then pass it into the squares as a callback
  const handleSquareClick = (id) => {
    const squaresCopy = [...squares] // same as clone in Ruby (spread operator)

    for(let row in squaresCopy) {
      for(let col in squaresCopy) {
        let filledSquare = squaresCopy[row][col];

        if (winner || filledSquareCount === 9) return;  // TODO
          
        if (filledSquare.id === id && filledSquare.value === '' && !winner) {
          filledSquare.value = currentPlayer;
          updateStates(squaresCopy);
          return;
        };
      }; 
    };
  };


  // helper function for wave 2
  const updateStates = (squaresCopy) => {
    setFilledSquareCount(filledSquareCount + 1);
    setSquares(squaresCopy);
    switchPlayer(currentPlayer);
    setWinner(checkForWinner(squares));
  };


  // helper funciton for Wave 2 and Wave 4
  const switchPlayer = (player) => {
    player === PLAYER_1 ? setCurrentPlayer(PLAYER_2) : setCurrentPlayer(PLAYER_1);
  };


  const checkForWinner = () => {
    // Complete in Wave 3
    
    for(let i in WINNING_LINES) {
      const [a, b, c] = WINNING_LINES[i]  // Distructuring

      const squareValues = getSquareValues();

      if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[b] === squareValues[c]) {
        return squareValues[a]; 
      };
    };
    return null;
  };


  // helper function for Wave 3
  const getSquareValues = () => {
    const squareValues = [];

    squares.forEach(square => {
      squareValues.push(square[0].value, square[1].value, square[2].value);
    });

    return squareValues;
  };


  const resetGame = () => {
    // Complete in Wave 4
    switchPlayer(winner);
    setSquares(generateSquares());
    setFilledSquareCount(0);
    setWinner(null);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{winner ? `The winner is ${winner}!!! 😊` : `Current Player ${currentPlayer}`} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      
      <main>
        <Board squares={squares} onClickCallback={handleSquareClick}/>
      </main>
    </div>
  );
};

export default App;
