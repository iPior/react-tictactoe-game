import GameBoard from "./GameBoard"
import GameboardHeader from "./GameBoardHeader";
import { useState, useEffect } from "react"
import axios from "axios";

export default function MainSection(props) {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(props.whoGoesFirst)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)
  const [availableMoves, setAvailableMoves] = useState([0,1,2,3,4,5,6,7,8])

  const fetchAPI = async () => {
      await axios
        .post(
          "http://localhost:8080/claude",
          // "https://react-tictactoe-game.onrender.com/claude", 
          {gameState: gameState, availableMoves: availableMoves},
          {headers: {'Content-Type': 'application/json'}}
        )
        .then(res => {
          console.log(res.data);
          updateGameboard(res.data);
        })
        .catch((err) => { //if there is an error, do a random move
          console.error(err);
          alert("Error while communicating with Claude. Taking a random move.")
          const randomIndex = Math.floor(Math.random()*availableMoves.length)
          updateGameboard(randomIndex)
        });
        
  };
  
  /*    useEffect hook to check if there is a win/draw every time the gameState changes    */
  useEffect(() => {
    // Checking win
    let winDetected = false; 
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      winDetected = true;
      setWinningElements([0, 4, 8]);
    }
    else if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      winDetected = true;
      setWinningElements([2, 4, 6])
    }
    else  {
      // check horizontal / vertical
      for (let i = 0; i <= 2; i++){
        if (gameState[(3*i)] === gameState[(3*i)+1] && gameState[(3*i)+1] === gameState[(3*i)+2] && gameState[(3*i)+2] !== ""){
          winDetected = true;
          setWinningElements([(3*i), (3*i)+1, (3*i)+2])
        }
        else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6] && gameState[i+6] !== ""){
          winDetected = true;
          setWinningElements([i, i+3, i+6])
        }
      }
    }
    if (winDetected) setIsGameWon(true);

    // Checking draw
    if (!winDetected && gameState.join("").length === 9) setIsGameDrawn(true);
    
    // Set players turn but only if its not the first turn, this is specfically for if the game's been reset to play again and the states updates because the gameboard has been reset but the turn should not change
    if (gameState.join("").length !== 0) setPlayersTurn(prev =>!prev);

  }, [gameState])

  /*    useEffect hook to check if it is the AI's turn    */
  useEffect(() => {
     // small delay to ensure state updates are processed
    if (!playersTurn && !isGameWon && !isGameDrawn) {
      const timeoutId = setTimeout(() => {
        fetchAPI();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [playersTurn, isGameWon, isGameDrawn])

  function updateGameboard(index) {
    
    if (gameState[index] === "") {
      setGameState(prev => {
        const newArray = [... prev]
        newArray[index] = playersTurn ? "x" : "o"
        return newArray
      })
      setAvailableMoves(prev => {
        const newArray = [... prev]
        const newIndex = newArray.findIndex(element => element === index)
        newArray.splice(newIndex, 1);
        return newArray;
      })
    }
  }

  function resetGame(goFirst) {
    setGameState(["","","","","","","","",""])
    setIsGameWon(false)
    setIsGameDrawn(false)
    setPlayersTurn(goFirst)
    setWinningElements([])
    setAvailableMoves([0,1,2,3,4,5,6,7,8]);
  }
  
  return (
    <div className=" max-sm:w-full max-sm:h-full flex flex-col sm:justify-center items-center align-middle">
      <GameboardHeader 
        isGameWon={isGameWon}
        isGameDrawn={isGameDrawn}
        playersTurn={playersTurn}
      />
      <GameBoard
        gameStateArray={gameState}
        update={updateGameboard}
        resetGame={resetGame}
        isGameWon={isGameWon}
        isGameDrawn={isGameDrawn}
        playersTurn={playersTurn}
        winningElements={winningElements}
      />
    </div>
  )
} 