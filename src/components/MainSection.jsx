import StandbyPieces from "./StandbyPieces"
import GameBoard from "./GameBoard"
import { useState } from "react"

export default function MainSection() {
  const [gameState, setGameState] = useState(["-","-","-","-","-","-","-","-","-"]);



  function updateGameboard(index) {
    setGameState(prev => {
      
    })
  }
  
  return (
    <div
      className="w-full my-4 h-4/6 flex flex-col sm:flex-row"
    >
      <StandbyPieces/>
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
      />
      <StandbyPieces />
    </div>
  )
} 