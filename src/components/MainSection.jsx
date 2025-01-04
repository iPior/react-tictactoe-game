import GameBoard from "./GameBoard"
import Anthropic from '@anthropic-ai/sdk';
import { useState, useEffect } from "react"
import GameboardHeader from "./GameBoardHeader";

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

/*
 * Things to fix/add:
 *  1. Not making a move when it is the opponents turn to go
 *  2. Perhaps a better AI prompt
 *      -'You are the best tictactoe player'
 *  3. Modularize the AI stuff into a utils file
 *  4. Clean up the tailwind css
 *  5. Clean up the extra comments that are unnecessary
 */

const ANTHROPIC_PROMPT = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.
You will receive:
1. gameState: an array of 9 indices using 'x', 'o', and '' for empty spaces
2. availableMoves: an array of number which are available indicies to choose from to make your move

Rules:
- You can only select indices from the available moves (this is really important)

WINNING_COMBINATIONS [a,b,c] = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]

Strategy priority (ONLY considering indicies from available moves):
1. For each winning combination [a,b,c]:
  - If two positions have 'o' and one is empty, take that winning move
  - If there is no winning move, and if two positions have 'x' and one is empty, block that empty position
2. If no immediate threats/wins, create fork opportunities
3. Take center if available, then corners

Return only a JSON object with:
- reason: string (brief strategy explanation)
- index: number (must be a number from availableMoves)
`

export default function MainSection(props) {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(props.whoGoesFirst)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)
  const [availableMoves, setAvailableMoves] = useState([0,1,2,3,4,5,6,7,8])

  // claude-3-5-sonnet-20241022
  // claude-3-haiku-20240307
  async function getMoveFromClaude(prompt) {
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2000,
        system: prompt,
        messages: [
          { 
            role: "user", 
            content: JSON.stringify({
                gameState: gameState,
                availableMoves: availableMoves
            }),
          }
        ],
      });
      return JSON.parse(msg.content[0].text)

    } catch(error) {
      console.error(error)
      alert("Error while communicating with Claude. Taking a random move.")
    }
  }

  /*    useEffect hook to check if there is a win every time the gameState changes    */
  useEffect(() => {
    // Checking win
    let winDetected = false;
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      winDetected = true;
      setWinningElements([0, 4, 8]);
    }
    else if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      winDetected = true;
      setWinningElements([2, 4, 6])
    }
    else  {
      // check horizontal / vertical
      for (let i = 0; i <= 2; i++){
        if (gameState[(3*i)] === gameState[(3*i)+1] && gameState[(3*i)+1] === gameState[(3*i)+2] && gameState[(3*i)+2] !== ""){
          winDetected = true;
          setWinningElements([(3*i), (3*i)+1, (3*i)+2])
        }
        else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6] && gameState[i+6] !== ""){
          winDetected = true;
          setWinningElements([i, i+3, i+6])
        }
      }
    }
    if (winDetected) setIsGameWon(true);

    // Checking draw
    if (!winDetected && gameState.filter(cell => cell === "").length === 0) {
      setIsGameDrawn(true)
    }
  }, [gameState])

  /*    useEffect hook to check if it is the AI's turn    */
  useEffect(() => {
     // small delay to ensure state updates are processed
    if (!playersTurn && !isGameWon && !isGameDrawn) {
      const timeoutId = setTimeout(() => {
        getMoveFromClaude(ANTHROPIC_PROMPT)
          .then(response => {
            console.log(response);
            updateGameboard(response.index);
          })
          .catch((err) => {
            console.error(err);
            const randomIndex = Math.floor(Math.random()*availableMoves.length)
            updateGameboard(randomIndex)
          });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [playersTurn, isGameWon, isGameDrawn])

  function updateGameboard(index) {
    
    if (gameState[index] === "") {
      setGameState(prev => {
        const newArray = [... prev]
        newArray[index] = playersTurn ? "x" : "o"
        return newArray
      })
      setAvailableMoves(prev => {
        const newArray = [... prev]
        const newIndex = newArray.findIndex(element => element === index)
        newArray.splice(newIndex, 1);
        return newArray;
      })
      setPlayersTurn(prev => !prev);
    }
    else {
      console.log("error updating gameboard")
    }
  }

  function resetGame(goFirst) {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(goFirst)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
    setAvailableMoves([0,1,2,3,4,5,6,7,8]);
  }
  
  return (
    <div className=" max-sm:w-full max-sm:h-full flex flex-col sm:justify-center items-center align-middle">
      <GameboardHeader 
        isGameWon={isGameWon}
        isGameDrawn={isGameDrawn}
        playersTurn={playersTurn}
      />
      <GameBoard
        gameStateArray={gameState}
        update={updateGameboard}
        resetGame={resetGame}
        isGameWon={isGameWon}
        isGameDrawn={isGameDrawn}
        winningElements={winningElements}
      />
    </div>
  )
} 