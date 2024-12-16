import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    <div className='h-screen'>
      <div
        className="relative px-4 w-full md:w-5/6 mx-auto flex flex-col align-middle justify-center shadow-2xl rounded-3xl
        border-4 border-opacity-20 border-dark mb-2
        "
      >
        <Header />
      </div>
      <div
        className=" my-2 px-4 w-full md:w-5/6 mx-auto flex flex-col align-middle justify-center shadow-2xl rounded-3xl
        border-4 border-opacity-20 border-dark
        "
      >
      <MainSection />
    </div>
    <div
        className="relative px-4 w-full md:w-5/6 mx-auto flex flex-col align-middle justify-center shadow-2xl rounded-3xl
        border-4 border-opacity-20 border-dark mb-4
        "
      >
      <Footer/>
    </div>
  </div>
  )
}