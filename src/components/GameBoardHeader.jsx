import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser} from '@fortawesome/free-solid-svg-icons'

export default function GameboardHeader(props) {
    return (
        <div className="w-full p-4 shadow-2xl rounded-t-3xl border-4 border-b-0 border-opacity-20 bg-dark border-white text-white">
            {props.isGameWon && (
                <div className="text-center text-3xl sm:text-5xl font-bold ">
                    {
                        props.playersTurn ?
                        <><FontAwesomeIcon icon={faRobot}/> Claude wins!</> :
                        <><FontAwesomeIcon icon={faUser}/> You win!</>
                    }
                </div>
            )}
            {props.isGameDrawn && (
                <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{"Draw"}</div>
            )}
      
            {!props.isGameWon && !props.isGameDrawn && (
                <div className="text-center text-3xl sm:text-5xl font-bold mb-2">
                {
                    props.playersTurn ?
                    <><FontAwesomeIcon icon={faUser}/> Your turn</> :
                    <><FontAwesomeIcon icon={faRobot}/> Claude's turn!</>
                }
                </div>
            )}
      </div>
    )
  }