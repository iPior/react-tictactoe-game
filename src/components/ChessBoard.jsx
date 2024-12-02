import LostChessPieces from "./LostChessPieces"

export default function ChessBoard() {
  
  return (
    <div
      className="w-full my-4 h-4/6 flex flex-col sm:flex-row"
    >
      <LostChessPieces/>
      <div className="sm:w-2/3 my-4 sm:my-0 sm:mx-4 h-4/6 sm:h-full bg-red-500">
        chess
      </div>
      <LostChessPieces />
    </div>
  )
} 