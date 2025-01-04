import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  
    return (
      <footer
        className="w-full py-4 flex flex-col xs:flex-row justify-center bg-primaryblue rounded-b-3xl border-4 border-t-0 border-accentorange text-xs xs:text-md sm:text-lg lg:text-xl text-gray-100
        " 
      >
        <div className=" flex justify-center xs:justify-start items-center xs:mx-6 hover:text-primaryorange">
          <a href='https://github.com/iPior/' className='hover:text-primaryorange mb-2 xs:mb-0'><FontAwesomeIcon icon={faGithub} className='mr-1 xs:mr-2' />My Github</a>
        </div>
        <div className="flex justify-center xs:justify-start items-center xs:mx-6 hover:text-primaryorange">
          <a href='https://github.com/iPior/react-tictactoe-game'><FontAwesomeIcon icon={faCode} className='mr-1 xs:mr-2' />Source Code</a>
        </div>
      </footer>
    )
  }