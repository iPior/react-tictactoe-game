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
          disabled={props.isGameWon || !props.playersTurn}
      >
        {cell === "" ? 
          null : 
          <FontAwesomeIcon icon={cell === 'x' ? faX : faO} className={clsx('text-4xl', 'sm:text-6xl', 'md:text-8xl', props.winningElements.includes(index) ? 'text-gray-100' : '', cell === 'x' ? 'text-accentblue' : 'text-accentorange')}/>
        }
      </button> 
  ))
  
  return (

    <div className="max-sm:w-full px-4 shadow-2xl border-4 border-y-0 border-accentorange bg-primaryblue text-center">
      
      <div className="max-sm:w-full sm:my-0 bg-dark flex flex-wrap sm:grid sm:grid-cols-3">
        {gridElements}
      </div>

      {(props.isGameWon || props.isGameDrawn) && (
        <div className='font-bold text-sm sm:text-lg lg:text-2xl text-gray-100 flex flex-col xs:flex-row justify-center'>
        <button 
          className="mt-4 rounded-xl animate-spin transform scale-105 py-2 sm:py-4 xs:mr-3" 
          onClick={() => props.resetGame(true)}
        >
          <span className='bg-accentblue text-gray-100 border-2 border-accentblue rounded-l-xl p-2 sm:p-4'><FontAwesomeIcon icon={faX}/></span>
          <span className='bg-gray-100 text-primaryblue  rounded-r-xl border-2 border-gray-100 p-2 pl-1 sm:p-4 sm:pl-1'>PLAY AGAIN</span>
        </button>
        <button 
          className="mt-4 rounded-xl font-bold animate-spin transform scale-105 py-2 sm:py-4 xs:ml-3" 
          onClick={() => props.resetGame(false)}
        >
          <span className='bg-accentorange text-gray-100 border-2 border-accentorange rounded-l-xl p-2 sm:p-4'><FontAwesomeIcon icon={faO}/></span>
          <span className='bg-gray-100 text-primaryblue  rounded-r-xl border-2 border-gray-100 p-2 pl-1 sm:p-4 sm:pl-1'>PLAY AGAIN</span>
        </button>
        </div>
      )}
      </div>
    
  )
} 