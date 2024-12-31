import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  
    return (
      <footer
        className="w-full py-4 flex flex-col md:flex-row justify-center bg-dark rounded-b-3xl border-4 border-t-0 border-opacity-20 border-white 
        "
      >

        {/* <div className="text-lg lg:text-2xl flex justify-center md:justify-start items-center">
          <FontAwesomeIcon icon={faStar} className='mr-1 sm:mr-2' />
          <p className=''>Developed by Piotr Szaran</p>
        </div> */}
        <div className="text-md lg:text-xl text-white flex justify-center md:justify-start items-center sm:mx-6">
          <FontAwesomeIcon icon={faGithub} className='mr-1 sm:mr-2' />
          <a className=''>My Github</a>
        </div>
        <div className="text-md lg:text-xl text-white flex justify-center md:justify-start items-center sm:mx-6">
          <FontAwesomeIcon icon={faCode} className='mr-1 sm:mr-2' />
          <a className=''>Source Code</a>
        </div>



      </footer>
    )
  }