import React, { useState } from 'react';
import { generateSquares } from './components/helper'
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
  const [score, setScore] = useState({
    player1: 0,
    player2: 0
  });
  

  // Wave 2
  // You will need to create a method to change the square 
  // When it is clicked on.
  // Then pass it into the squares as a callback
  const handleSquareClick = (id) => {
    const squaresCopy = [...squares] // same as clone in Ruby (spread operator)

    for(let row in squaresCopy) {
      for(let col in squaresCopy) {
        let filledSquare = squaresCopy[row][col];

        if (winner) return;  
          
        if (filledSquare.id === id && filledSquare.value === '' && !winner) {
          filledSquare.value = currentPlayer;

          updateStates(squaresCopy); // Update states
          return;
        };
      }; 
    };
  };


  // helper function for Wave 2
  const updateStates = (squaresCopy) => {
    setFilledSquareCount(filledSquareCount + 1);
    setSquares(squaresCopy);
    switchPlayer(currentPlayer);
    setWinner(checkForWinner());
  };


  // helper function for Wave 2 and Wave 4
  const switchPlayer = (player) => {
    player === PLAYER_1 ? setCurrentPlayer(PLAYER_2) : setCurrentPlayer(PLAYER_1);
  };


  const checkForWinner = () => {
    // Complete in Wave 3
    
    for(let idx in WINNING_LINES) {
      const [a, b, c] = WINNING_LINES[idx];  // Destructuring

      const squareValues = getSquareValues();

      if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[b] === squareValues[c]) {

        updateScoreState(squareValues[a]); // set scores
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

    return squareValues; // e.g. ["X", "O", "X", "X", "", "" ....]
  };

  
  // helper function for Wave 3 (setting a tie)
  // When it's a tie, display "Everyone is a winner!".
  const isTie = () => {
    if (filledSquareCount === 9 && !winner) {
      return "Everyone";
    };
  };

  // helper function for Wave 3
  const updateScoreState = (value) => {
    if (value === PLAYER_1) {
      setScore({
        player1: score.player1 + 1,
        player2: score.player2
      });
    } else {
      setScore({
        player1: score.player1,
        player2: score.player2 + 1
      });
    };
  };


  const resetGame = () => {
    // Complete in Wave 4
    // The person who lost the previous game will make the first move in the new game
    switchPlayer(winner);  
    setSquares(generateSquares());
    setFilledSquareCount(0);
    setWinner(null);
  };

  const resetScores = () => {
    setScore({
      player1: 0,
      player2: 0
    });

    resetGame();
  };

  const printPlayerName = value => {
    if (value === PLAYER_1) {
      return 'Player 1 (X)';
    } else {
      return 'Player 2 (O)';
    };
  };


  return (
    <div className="App">
      <header className="App-header">

        <div className="header-container">
          <h1>React Tic Tac Toe</h1>
          <div className="score-chart">
            <h4>Scores</h4>
            <h5>Player1 <span role="img" aria-label="vs">🆚</span> Player2 </h5>
            <p className="score-number">{score.player1} - {score.player2}</p>
          </div>
        </div>
        
        <h3 className={winner || isTie() ? 'hidden' : 'block'}>
          Who's turn? {printPlayerName(currentPlayer)}
        </h3>

        <h3 className={!winner && !isTie() ? 'hidden' : 'block'}>
          {isTie() ? isTie() : printPlayerName(winner)} is a winner! 😊 
        </h3>

        <div className="button-container">
          <button className="purple-button button" onClick={resetGame}>
            Reset Game
          </button>

          <button className="blue-button button" onClick={resetScores}>
            Reset Scores
          </button>
        </div>

      </header>

      <main>
        <Board squares={squares} onClickCallback={handleSquareClick}/>
      </main>
    </div>
  );
};

export default App;
