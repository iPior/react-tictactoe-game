import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser} from '@fortawesome/free-solid-svg-icons'

export default function GameboardHeader(props) {
    return (
        <div className="w-full p-4 shadow-2xl rounded-t-3xl border-4 border-b-0 bg-primaryblue border-accentorange text-gray-100 text-center text-3xl sm:text-4xl lg:text-5xl font-bold ">
            {!props.isGameWon && !props.isGameDrawn && (
                <div className="my-2">
                {
                    props.playersTurn ?
                    <><FontAwesomeIcon icon={faUser}/> Your turn!</> :
                    <><FontAwesomeIcon icon={faRobot}/> Claude's turn!</>
                }
                </div>
            )}
            {props.isGameWon && (
                <div className='my-2'>
                    {
                        props.playersTurn ?
                        <><FontAwesomeIcon icon={faRobot}/> Claude wins!</> :
                        <><FontAwesomeIcon icon={faUser}/> You win!</>
                    }
                </div>
            )}
            {props.isGameDrawn && (
                <div className="">Draw!</div>
            )}
      
      </div>
    )
  }