
export default function GameBoard(props) {

  // const gridElements = Array.from({ length: 9 }, (_, index) => (
  //   <button 
  //       className="flex items-center justify-center bg-tertiary rounded-lg border-2 border-dark hover:bg-secondary"
  //       key={index}
  //   >
  //   </button>
  // ))

  const gridElements = props.gameStateArray.map((cell, index) => (
    
      <button 
          className="flex items-center justify-center bg-tertiary rounded-lg border-2 border-dark hover:enabled:bg-secondary"
          key={index}
          onClick={() => props.update(index)}
      >
        {cell === "-" ? null : cell} 
      </button> 

  ))

  
  
  return (
    <div className="sm:w-2/3 my-4 sm:my-0 sm:mx-4 h-4/6 sm:h-full grid grid-cols-3 gap-1 rounded-lg border-2 p-1 border-dark">
        {gridElements}
    </div>
  )
} 