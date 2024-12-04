import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    
    <div
      className="relative h-screen w-full flex flex-col sm:my-24 align-middle justify-center shadow-2xl rounded-3xl p-4 
      border-2 border-opacity-15 border-black
      "
    >
      <div className='h-screen'>
        <Header />
        <MainSection />
        <Footer/>
      </div>
    </div>
  )
}