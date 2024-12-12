import StandbyPieces from "./StandbyPieces"
import GameBoard from "./GameBoard"
import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'

export default function MainSection() {
  const [gameState, setGameState] = useState([" "," "," "," "," "," "," "," "," "]);
  const [playersTurn, setPlayersTurn] = useState(true)



  function updateGameboard(index) {
    setGameState(prev => {
      const newArray = [... prev]
      newArray[index] = <FontAwesomeIcon icon={playersTurn ? faX : faO} className='text-5xl sm:text-8xl text-dark'/>
      return newArray
    })
    setPlayersTurn(!playersTurn)
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