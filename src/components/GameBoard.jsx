import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge'



export default function GameBoard(props) {

  const gridElements = props.gameStateArray.map((cell, index) => (
    
      <button 
          className={twMerge("flex items-center justify-center bg-tertiary border-2 border-dark hover:enabled:bg-secondary font-weight-bold box-border h-1/3 w-1/3", 
            clsx()
          )}
          key={index}
          onClick={() => props.update(index)}
          value={cell}
          disabled={props.isGameWon}
      >
        {/* hard code the pixel values */}
        {cell === "" ? null : <FontAwesomeIcon icon={cell === 'x' ? faX : faO} className='text-5xl sm:text-8xl text-dark'/>}
      </button> 

  ))
  
  
  return (
    <div className="h-full sm:h-5/6 w-full sm:w-5/6 my-2 sm:my-0 sm:mx-4 flex rounded-lg bg-dark flex-wrap">
        {gridElements}
    </div>
  )
} 