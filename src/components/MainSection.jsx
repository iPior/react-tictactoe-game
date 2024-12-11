import StandbyPieces from "./StandbyPieces"
import GameBoard from "./GameBoard"
import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function MainSection() {
  const [gameState, setGameState] = useState([" "," "," "," "," "," "," "," "," "]);



  function updateGameboard(index) {
    setGameState(prev => {
      const newArray = [... prev]
      newArray[index] = <FontAwesomeIcon icon={faX} className=''/>
      return newArray
    })
  }
  
  return (
    <div
      className=" w-full my-2 h-1/2 sm:h-full flex flex-col sm:flex-row sm:justify-center items-center"
    >
      {/* <StandbyPieces/> */}
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
      />
      {/* <StandbyPieces /> */}
    </div>
  )
} 