import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

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
          className="flex items-center justify-center bg-tertiary border-2 border-dark hover:enabled:bg-secondary font-weight-bold box-border
          h-1/3 w-1/3"
          key={index}
          onClick={() => props.update(index)}
          value={cell}
      >
        {/* hard code the pixel values */}
        {cell}
      </button> 

  ))

  
  
  return (
    <div className="h-full sm:h-5/6 w-full sm:w-5/6 my-2 sm:my-0 sm:mx-4 flex rounded-lg bg-dark flex-wrap">
        {gridElements}
    </div>
  )
} 