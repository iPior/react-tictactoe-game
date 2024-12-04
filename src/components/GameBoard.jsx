import GameBoardGridSquare from "./GameBoardGridSquare"

export default function GameBoard() {

  const gridElements = Array.from({ length: 9 }, (_, index) => (
    <GameBoardGridSquare key={index} />
  ))
  
  return (
    <div className="sm:w-2/3 my-4 sm:my-0 sm:mx-4 h-4/6 sm:h-full grid grid-cols-3 gap-1 rounded-lg border-2 p-1 border-dark">
        {gridElements}
    </div>
  )
} 