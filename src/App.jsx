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
    <div className='absolute top h-screen w-2/3 md:w-5/6 lg:w-full mx-auto flex align-middle justify-center bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(193,221,233,1)_100%)]'>
      <div className="max-sm:w-full m-auto flex flex-col align-middle justify-center rounded-3xl shadow-[0_0_40px_rgba(231,111,81,0.7)]">
        {startGame ? <MainSection whoGoesFirst={whoGoesFirst}/> : <Header firstMove={firstMove} />}
        <Footer/>
    </div>
  </div>
  )
}


