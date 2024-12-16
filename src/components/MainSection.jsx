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
      className=" w-full my-2 py-4 max-sm:h-full flex flex-col sm:justify-center items-center"
    >

      {isGameWon && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{playersTurn ? "Player O wins!" : "Player X wins!"}</div>
      )}
      {!isGameWon && (
        <div className="text-center text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">
          {playersTurn? "Your turn" : "Claude's turn"}
        </div>
      )}
      
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
        isGameWon={isGameWon}
      />
      {isGameWon && (
        <button className=" w-full sm:m-4 sm:w-48 bg-dark text-2xl p-4 text-white font-bold hover:bg-tertiary hover:text-dark" onClick={() => window.location.reload()}>PLAY AGAIN</button>

      )}
    </div>
  )
} 