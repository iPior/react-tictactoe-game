import './App.css'
import Header from './components/Header'
import ChessBoard from './components/ChessBoard'
import Footer from './components/Footer'
import './index.css'

export default function App() {

  return (
    <div
      className="h-screen w-full flex flex-col sm:py-24 align-middle justify-center 
      "
    >
      <Header />
      <ChessBoard />
      <Footer></Footer>
    </div>
  )
}