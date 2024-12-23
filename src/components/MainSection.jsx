import GameBoard from "./GameBoard"
import { useState, useEffect } from "react"

// import.meta.env.REACT_APP_VITE_

export default function MainSection() {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)

  useEffect(() => {
    checkDraw()
    checkWin()
  }, [gameState])

  function checkDraw() {
    let emptyCells = gameState.filter(cell => cell === "").length
    if (emptyCells === 0 &&!isGameWon) {
      setIsGameDrawn(true)
    }
  }

  function checkWin() {
    // check diagonal
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      setIsGameWon(true)
      setWinningElements([0, 4, 8])
      return
    }
    if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      setIsGameWon(true)
      setWinningElements([2, 4, 6])
      return
    }
    // check horizontal / vertical
    for (let i = 0; i <= 2; i++){
      if (gameState[(3*i)] === gameState[(3*i)+1] && gameState[(3*i)+1] === gameState[(3*i)+2] && gameState[(3*i)+2] !== ""){
        setIsGameWon(true)
        setWinningElements([(3*i), (3*i)+1, (3*i)+2])
        return 
      }
      else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6] && gameState[i+6] !== ""){
        setIsGameWon(true)
        setWinningElements([i, i+3, i+6])
        return 
      }
    }
  }

  function updateGameboard(index) {
    if (gameState[index] === "") {
      setGameState(prev => {
        const newArray = [... prev]
        newArray[index] = playersTurn ? "x" : "o"
        return newArray
      })
      setPlayersTurn(!playersTurn)
    }
  }

  function resetGame() {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(true)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
  }
  
  return (
    <div
      className=" w-full my-2 py-4 max-sm:h-full flex flex-col sm:justify-center items-center"
    >

      {isGameWon && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{playersTurn ? "Claude wins!" : "You win!"}</div>
      )}
      {isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{"Draw"}</div>
      )}
      {!isGameWon && !isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">
          {playersTurn? "Your turn" : "Claude's turn"}
        </div>
      )}
      
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
        isGameWon={isGameWon}
        winningElements={winningElements}
      />
      {(isGameWon || isGameDrawn) && (
        <button className=" w-full sm:mt-4 sm:w-48 bg-dark text-2xl p-4 text-white font-bold hover:bg-tertiary hover:text-dark" onClick={resetGame}>PLAY AGAIN</button>

      )}
    </div>
  )
} 