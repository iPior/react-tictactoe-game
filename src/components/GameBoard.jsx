import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge'



export default function GameBoard(props) {

  const gridElements = props.gameStateArray.map((cell, index) => (
    
      <button 
          className="flex items-center justify-center bg-tertiary border-2 border-dark hover:enabled:bg-secondary font-weight-bold box-border h-32 w-1/3 sm:h-36 sm:w-36 md:h-48 md:w-48 lg:h-48 lg:w-48 xl:h-60 xl:w-60 2xl:h-72 2xl:w-72"
          key={index}
          onClick={() => props.update(index)}
          value={cell}
          disabled={props.isGameWon}
      >
        {/* hard code the pixel values */}
        {cell === "" ? null : <FontAwesomeIcon icon={cell === 'x' ? faX : faO} className=' text-2xl sm:text-5xl md:text-8xl text-dark'/>}
      </button> 

  ))
  
  
  return (
    <div className="max-sm:w-full my-2 sm:my-0 bg-dark   flex flex-wrap sm:grid sm:grid-cols-3">
        {gridElements}
    </div>
  )
} 