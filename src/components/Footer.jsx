import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faStar } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  
    return (
      <footer
        className="w-full py-4 lg:w-5/6 m-auto flex flex-col md:flex-row justify-between
        "
      >

        <div className="text-lg lg:text-2xl flex justify-center md:justify-start items-center">
          <FontAwesomeIcon icon={faStar} className='mr-1 sm:mr-2' />
          <p className=''>Developed by Piotr Szaran</p>
        </div>
        <div className="text-lg lg:text-2xl flex justify-center md:justify-start items-center my-1 sm:my-0">
          <FontAwesomeIcon icon={faGithub} className='mr-1 sm:mr-2' />
          <a className=''>My Github</a>
        </div>
        <div className="text-lg lg:text-2xl flex justify-center md:justify-start items-center">
          <FontAwesomeIcon icon={faCode} className='mr-1 sm:mr-2' />
          <a className=''>Source Code</a>
        </div>



      </footer>
    )
  }