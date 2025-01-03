import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge'

export default function GameBoard(props) {

  const gridElements = props.gameStateArray.map((cell, index) => (
      <button 
          className={twMerge("flex items-center justify-center border-2 border-primaryblue hover:enabled:bg-gray-300 font-weight-bold box-border h-28 w-1/3 sm:h-36 sm:w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-52 xl:w-52 2xl:h-52 2xl:w-52", clsx(props.winningElements.includes(index) ? 'bg-accentblue' : 'bg-gray-100'))}
          key={index}
          onClick={() => props.update(index)}
          value={cell}
          disabled={props.isGameWon}
      >
        {cell === "" ? 
          null : 
          <FontAwesomeIcon icon={cell === 'x' ? faX : faO} className={clsx('text-2xl', 'sm:text-5xl', 'md:text-8xl', props.winningElements.includes(index) ? 'text-gray-100' : '', cell === 'x' ? 'text-accentblue' : 'text-accentorange')}/>
        }
      </button> 
  ))
  
  return (

    <div className="max-sm:w-full px-4 shadow-2xl border-4 border-y-0 border-accentorange bg-primaryblue text-center">
      
      <div className="max-sm:w-full my-2 sm:my-0 bg-dark flex flex-wrap sm:grid sm:grid-cols-3">
        {gridElements}
      </div>

      {(props.isGameWon || props.isGameDrawn) && (
        <div>
        <button 
          className="mt-4 bg-primaryorange rounded-xl  sm:text-lg lg:text-2xl text-gray-100 font-bold animate-spin transform scale-105 py-4 mr-6" 
          onClick={() => props.resetGame(true)}
        >
          <span className='bg-accentblue text-gray-100 border-2 border-accentblue rounded-l-xl p-4'><FontAwesomeIcon icon={faX}/></span>
          <span className='bg-gray-100 text-primaryblue  rounded-r-xl border-2 border-gray-100 p-4'>PLAY AGAIN</span>
        </button>
        <button 
          className="mt-4 bg-primaryorange rounded-xl  sm:text-lg lg:text-2xl text-gray-100 font-bold animate-spin transform scale-105 py-4" 
          onClick={() => props.resetGame(false)}
        >
          <span className='bg-accentorange text-gray-100 border-2 border-accentorange rounded-l-xl p-4'><FontAwesomeIcon icon={faO}/></span>
          <span className='bg-gray-100 text-primaryblue  rounded-r-xl border-2 border-gray-100 p-4'>PLAY AGAIN</span>
        </button>
        </div>
      )}
      </div>
    
  )
} 