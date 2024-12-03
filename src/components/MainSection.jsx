import StandbyPieces from "./StandbyPieces"
import GameBoard from "./GameBoard"

export default function MainSection() {
  
  return (
    <div
      className="w-full my-4 h-4/6 flex flex-col sm:flex-row"
    >
      <StandbyPieces/>
      <GameBoard />
      <StandbyPieces />
    </div>
  )
} 