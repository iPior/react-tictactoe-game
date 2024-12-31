import './App.css'
import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import './index.css'
import { useState } from 'react'

export default function App() {
  const[startGame, setStartGame] = useState(false);
  const[whoGoesFirst, setWhoGoesFirst] = useState(true);

  function firstMove(ifPlayer) {
    setWhoGoesFirst(ifPlayer)
    setStartGame(true);
  }

  return (
    <div className='h-screen flex align-middle justify-center'>
      {/* <div
        className="relative px-4 w-full md:w-5/6 mx-auto flex flex-col align-middle justify-center shadow-2xl rounded-3xl
        border-4 border-opacity-20 border-dark mb-2
        "
      >
        <Header 
          startGame={setStartGame}
        />
      </div> */}
      <div
        className="m-auto flex flex-col align-middle justify-center 
        "
      >
        {startGame ? <MainSection whoGoesFirst={whoGoesFirst}/> : <Header firstMove={firstMove} />}
        <Footer/>
      {/* <MainSection /> */}
    </div>
    {/* <div
        className="relative px-4 w-full md:w-5/6 mx-auto flex flex-col align-middle justify-center shadow-2xl rounded-3xl
        border-4 border-opacity-20 border-dark mb-4
        "
      >
      
    </div> */}
  </div>
  )
}