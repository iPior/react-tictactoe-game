import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faO } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
  
  return (
    <header
      className="w-full h-full px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-20 text-primaryblue text-center my-auto flex flex-col items-center shadow-2xl rounded-t-3xl
        border-4 border-b-0 border-accentorange bg-gray-100 justify-center align-middle"
    >
        <h1 className="text-3xl sm:text-6xl md:text-8xl mb-2 font-bold flex justify-center align-bottom h-full">
          Tic Tac Toe
          {/* <p className='text-primaryorange text-8xl'>T</p>ic <p className='text-primaryorange text-8xl'>T</p>ac <p className='text-primaryorange text-8xl'>T</p>oe  */}
        </h1>
        <p className="mx-auto sm:max-w-2xl text-xs sm:text-lg md:text-xl text-center">
          Classic Tic-tac-toe with a modern twist. Challenge Anthropic's AI and test your skills against an opponent that thinks several moves ahead, planning sequences of moves to achieve victory. Can you outmaneuver the AI's strategic planning and emerge victorious in this timeless battle of X's and O's?
        </p>
        <div className='flex flex-col sm:flex-row mt-4 text-gray-100 font-bold'>
          <button 
            className="mb-2 sm:mb-0 py-4 text-sm sm:text-lg md:text-2xl rounded-xl group sm:mr-2"
            onClick={() => props.firstMove(true)}
          >
          <span className='bg-primaryorange text-primaryblue border-2 border-primaryblue rounded-l-xl p-4 group-hover:bg-primaryblue group-hover:text-primaryorange'><FontAwesomeIcon icon={faX}/></span>
          <span className='bg-primaryblue  rounded-r-xl border-2 border-primaryblue p-4 group-hover:bg-primaryorange group-hover:text-primaryblue'>Go First</span>
          </button>
          <button 
            className="mb-2 py-4 sm:mb-0 text-sm sm:text-lg md:text-2xl rounded-xl group"
            onClick={() => props.firstMove(false)}
          >
            <span className='bg-primaryorange text-primaryblue border-2 border-primaryblue rounded-l-xl p-4 group-hover:bg-primaryblue group-hover:text-primaryorange'><FontAwesomeIcon icon={faO}/></span>
            <span className='bg-primaryblue  rounded-r-xl border-2 border-primaryblue p-4 group-hover:bg-primaryorange group-hover:text-primaryblue'>Go Second</span>
          </button>
        </div>
      
    </header>
  )
}