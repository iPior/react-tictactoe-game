import GameBoard from "./GameBoard"
import Anthropic from '@anthropic-ai/sdk';
import { useState, useEffect } from "react"

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
You are playing TIC TAC TOE. The grid is the traditional 3x3 but it will be given to you in the form of a 1x9 array. 
Example: First rows elements are indices 0,1,2, row 2 are indicies 3,4,5 and the last row elements are indicies 6,7, and 8. 
Of the nine indicies to make a move on, if the index is an empty string, then that spot is available to you to make a move.  
Take indicies will be denoted by a 'x' (for the users turn) and 'o' for your turn.
Return the index of the move you are making and no other text and make sure it is not in an index that already exists.`

export default function MainSection() {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)

  // claude-3-5-sonnet-20241022
  // claude-3-haiku-20240307

  async function getMoveFromClaude() {
    console.log(playersTurn, gameState)
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: [
        { 
          role: "user", 
          content: `${gameState}`,
        }
      ],
    });

    // if (gameState[msg.content[0].text] !== "") {

    // }
    console.log(msg.content[0])
    updateGameboard(msg.content[0].text)
    // return (msg.content[0].text)
    // add a try and catch
  }

  // useEffect(() => {
  //   getMoveFromClaude()
  // },[])

  useEffect(() => {
    if (!playersTurn) {
      getMoveFromClaude()
    }
    checkDraw()
    checkWin()
  }, [gameState])

  function checkDraw() {
    let emptyCells = gameState.filter(cell => cell === "").length
    if (emptyCells === 0 &&!isGameWon) {
      setIsGameDrawn(true)
    }
  }

  function checkWin() {
    // check diagonal
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      setIsGameWon(true)
      setWinningElements([0, 4, 8])
      return
    }
    if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      setIsGameWon(true)
      setWinningElements([2, 4, 6])
      return
    }
    // check horizontal / vertical
    for (let i = 0; i <= 2; i++){
      if (gameState[(3*i)] === gameState[(3*i)+1] && gameState[(3*i)+1] === gameState[(3*i)+2] && gameState[(3*i)+2] !== ""){
        setIsGameWon(true)
        setWinningElements([(3*i), (3*i)+1, (3*i)+2])
        return 
      }
      else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6] && gameState[i+6] !== ""){
        setIsGameWon(true)
        setWinningElements([i, i+3, i+6])
        return 
      }
    }
  }

  function updateGameboard(index) {
    if (gameState[index] === "") {
      setGameState(prev => {
        const newArray = [... prev]
        newArray[index] = playersTurn ? "x" : "o"
        return newArray
      })
      setPlayersTurn(!playersTurn)
    }
    else {
     return false
    }
  }

  function resetGame() {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(true)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
  }
  
  return (
    <div
      className=" w-full my-2 py-4 max-sm:h-full flex flex-col sm:justify-center items-center"
    >

      {isGameWon && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{playersTurn ? "Claude wins!" : "You win!"}</div>
      )}
      {isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">{"Draw"}</div>
      )}
      {!isGameWon && !isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">
          {playersTurn? "Your turn" : "Claude's turn"}
        </div>
      )}
      
      <GameBoard 
        gameStateArray={gameState}
        update={updateGameboard}
        isGameWon={isGameWon}
        winningElements={winningElements}
      />
      {(isGameWon || isGameDrawn) && (
        <button className=" w-full sm:mt-4 sm:w-48 bg-dark text-2xl p-4 text-white font-bold hover:bg-tertiary hover:text-dark" onClick={resetGame}>PLAY AGAIN</button>

      )}
    </div>
  )
} 