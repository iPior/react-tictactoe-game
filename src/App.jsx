import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    
    <div
      className="relative h-screen px-4 w-full flex flex-col align-middle justify-center shadow-2xl rounded-3xl
      border-4 border-opacity-20 border-dark
      "
    >
      <Header />
      <MainSection />
      <Footer/>
    </div>
  )
}