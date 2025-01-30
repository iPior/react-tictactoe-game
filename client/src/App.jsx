import Header from './components/Header'
import MainSection from './components/MainSection'
import Footer from './components/Footer'
import axios from 'axios'
import './index.css'
import { useState, useEffect } from 'react'

export default function App() {
  const[startGame, setStartGame] = useState(false);
  const[whoGoesFirst, setWhoGoesFirst] = useState(true);

  function firstMove(ifPlayer) {
    setWhoGoesFirst(ifPlayer)
    setStartGame(true);
  }

  /*    useEffect hook to cache the prompt    */
  useEffect(() => {
    const preRender = async () => {
      await  axios
      .post(
        "https://react-tictactoe-game.onrender.com/",
        {headers: {'Content-Type': 'application/json'}}
      )
      .catch((err) => {console.error(err);});
    }
    preRender()
  }, [])

  return (
    <div className=' top h-screen w-5/6 md:w-5/6 lg:w-full mx-auto flex align-middle justify-center'>
      <div className="max-sm:w-full m-auto flex flex-col align-middle justify-center rounded-3xl shadow-[0_0_40px_rgba(231,111,81,0.7)]">
        {startGame ? <MainSection whoGoesFirst={whoGoesFirst}/> : <Header firstMove={firstMove} />}
        <Footer/>
    </div>
  </div>
  )
}


