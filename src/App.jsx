import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    <div
      className="h-screen w-full flex flex-col sm:py-24 align-middle justify-center 
      "
    >
      <Header />
      <MainSection />
      <Footer></Footer>
    </div>
  )
}