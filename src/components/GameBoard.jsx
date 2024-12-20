import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge'



export default function GameBoard(props) {



  const gridElements = props.gameStateArray.map((cell, index) => (
    
      <button 
          className={twMerge("flex items-center justify-center  border-2 border-dark hover:enabled:bg-secondary font-weight-bold box-border h-32 w-1/3 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52", clsx(props.winningElements.includes(index) ? 'bg-secondary' : 'bg-tertiary'))}
          key={index}
          onClick={() => props.update(index)}
          value={cell}
          disabled={props.isGameWon}
      >
        {cell === "" ? 
          null : 
          <FontAwesomeIcon icon={cell === 'x' ? faX : faO} className={clsx('text-2xl', 'sm:text-5xl', 'md:text-8xl', props.winningElements.includes(index) ? 'text-white' : 'text-dark')}/>
        }
      </button> 

  ))
  
  
  return (
    <div className="max-sm:w-full my-2 sm:my-0 bg-dark   flex flex-wrap sm:grid sm:grid-cols-3">
        {gridElements}
    </div>
  )
} 