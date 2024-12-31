
import robot from "../../public/robot-svgrepo.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser, faX, faO } from '@fortawesome/free-solid-svg-icons'

export default function Header(props) {
  
  return (
    <header
      className="w-full h-full px-12 py-20 text-dark text-center my-auto flex flex-col items-center shadow-2xl rounded-t-3xl
        border-4 border-b-0 border-opacity-20 border-dark"
    >
      {/* <div className="flex align-middle text-9xl mb-8">
        <FontAwesomeIcon icon={faUser} className="mr-4 "/>
        <div className="text-xl flex flex-col justify-center">
          <FontAwesomeIcon icon={faV}/>
          <FontAwesomeIcon icon={faS}/>
        </div>
        <FontAwesomeIcon icon={faRobot} className="ml-4" />
      </div> */}
      <div>
        {/* <img src={robot} alt="Robot SVG" className="text-6xl"/>  */}
        <h1 className="text-xl sm:text-6xl mb-2 font-bold flex justify-center align-middle">
          Tic Tac Toe 
        </h1>
        <p className="mx-auto sm:max-w-2xl text-sm sm:text-lg text-center">
          Classic Tic-tac-toe with a modern twist. Challenge Anthropic's AI and test your skills against an opponent that thinks several moves ahead, planning sequences of moves to achieve victory. Can you outmaneuver the AI's strategic planning and emerge victorious in this timeless battle of X's and O's?
        </p>
        <button 
          className="w-full sm:mt-4 sm:w-52 bg-dark text-2xl p-4 text-white font-bold hover:bg-tertiary hover:text-dark rounded-xl mr-2"
          onClick={() => props.firstMove(true)}
        >
          Go First  - <FontAwesomeIcon icon={faX}/>
        </button>
        <button 
          className="w-full sm:mt-4 sm:w-52 bg-dark text-2xl p-4 text-white font-bold hover:bg-tertiary hover:text-dark rounded-xl"
          onClick={() => props.firstMove(false)}
        >
          Go Second - <FontAwesomeIcon icon={faO}/>
        </button>
      </div>
      
    </header>
  )
}