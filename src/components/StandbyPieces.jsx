import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function StandbyPieces() {
  
    return (
      <div
        className="sm:w-1/6 sm:h-full h-1/6 border border-black flex flex-col justify-between py-4"
      >
        <div className='h-1/6'>
          <FontAwesomeIcon icon={faX} className='h-full'/>
        </div>
        <div className='h-1/6'>
          <FontAwesomeIcon icon={faX} className='h-full'/>
        </div>
        <div className='h-1/6'>
          <FontAwesomeIcon icon={faX} className='h-full'/>
        </div>
        <div className='h-1/6'>
          <FontAwesomeIcon icon={faX} className='h-full'/>
        </div>
        <div className='h-1/6'>
          <FontAwesomeIcon icon={faX} className='h-full'/>
        </div>
      </div>
    )
  } 