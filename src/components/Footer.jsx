import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  
    return (
      <footer
        className="w-full py-4 flex flex-col sm:flex-row justify-center bg-primaryblue rounded-b-3xl border-4 border-t-0 border-accentorange text-xs sm:text-lg lg:text-xl text-gray-100
        " 
      >

        {/* <div className="text-lg lg:text-2xl flex justify-center md:justify-start items-center">
          <FontAwesomeIcon icon={faStar} className='mr-1 sm:mr-2' />
          <p className=''>Developed by Piotr Szaran</p>
        </div> */}
        <div className=" flex justify-center sm:justify-start items-center sm:mx-6 hover:text-primaryorange">
          <a href='https://github.com/iPior/' className='hover:text-primaryorange mb-2 sm:mb-0'><FontAwesomeIcon icon={faGithub} className='mr-1 sm:mr-2' />My Github</a>
        </div>
        <div className="flex justify-center sm:justify-start items-center sm:mx-6 hover:text-primaryorange">
          <a href='https://github.com/iPior/react-tictactoe-game'><FontAwesomeIcon icon={faCode} className='mr-1 sm:mr-2' />Source Code</a>
        </div>


        {/* background: radial-gradient(at 39% 72%, #070f2b 0px, transparent 50%), radial-gradient(at 74% 12%, #1b1a55 0px, transparent 50%), radial-gradient(at 75% 47%, #535c91 0px, transparent 50%), radial-gradient(at 87% 32%, #9290c3 0px, transparent 50%), #070f2b; */}
    

      </footer>
    )
  }