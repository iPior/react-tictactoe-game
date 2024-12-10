import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    
    <div
      className="relative h-screen w-full flex flex-col align-middle justify-center shadow-2xl rounded-3xl p-4 
      border-4 border-opacity-20 border-dark
      "
    >
        <Header />
        <MainSection />
        <Footer/>
    </div>
  )
}