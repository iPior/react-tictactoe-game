import StandbyPieces from "./StandbyPieces"
import GameBoard from "./GameBoard"
import { useState, useEffect } from "react"

export default function MainSection() {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [playersTurn, setPlayersTurn] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)

  useEffect(() => {
    checkWin()
  }, [gameState])

  function checkWin() {
    // check diagonal
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8] || gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      setIsGameWon(true)
      return
    }
    // check horizontal / vertical
    for (let i = 0; i <= 2; i++){
      if (gameState[i] !== "") {
        if (gameState[i] === gameState[i+1] && gameState[i+1] === gameState[i+2]){
          setIsGameWon(true)
          return 
        }
        else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6]){
          setIsGameWon(true)
          return 
        }
      }
    }
  }

  function updateGameboard(index) {
    setGameState(prev => {
      const newArray = [... prev]
      newArray[index] = playersTurn ? "x" : "o"
      return newArray
    })
    setPlayersTurn(!playersTurn)
  }
  
  return (
    <div
      className=" w-full my-2 h-1/2 sm:h-full flex flex-col sm:justify-center items-center"
    >

      {isGameWon && (
        <div className="text-center text-6xl font-bold">{playersTurn ? "Player O wins!" : "Player X wins!"}</div>
      )}
      {!isGameWon && (
        <div className="text-center text-6xl font-bold">
          {playersTurn? "Your turn" : "Claude's turn"}
        </div>
      )}
      
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
        isGameWon={isGameWon}
      />
      {isGameWon && (
        <button className="mt-4 w-48 sm:w-96 bg-dark text-white font-bold hover:bg-secondary" onClick={() => window.location.reload()}>Play again</button>

      )}
      {/* <StandbyPieces /> */}
    </div>
  )
} 