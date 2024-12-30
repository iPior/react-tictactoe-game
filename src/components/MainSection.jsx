import GameBoard from "./GameBoard"
import Anthropic from '@anthropic-ai/sdk';
import { check } from "prettier";
import { useState, useEffect } from "react"

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

const ANTHROPIC_PROMPT = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.
You will receive:
1. gameState: array of 9 indices using 'x', 'o', and '' for empty spaces

Rules:
- You can only select indices where gameState[index] is empty ('') (this is really important)

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]

[IMPORTANT] Before returning a move:
1. Check gameState[index] === '' for your chosen position
2. Never select an index that contains 'x' or 'o'
3. Only return an index that corresponds to an empty position

Strategy priority (ONLY considering empty positions):
1. For each winning combination [a,b,c]:
  - If two positions have 'o' and one is empty, take that winning move
  - If there is no winning move, and if two positions have 'x' and one is empty, block that empty position
2. If no immediate threats/wins, create fork opportunities
3. Take center if available, then corners

Return only a JSON object with:
- reason: string (brief strategy explanation)
- index: number (must be an empty position)
`

const ANTHROPIC_PROMPT_v2 = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.

STEP 1: DETERMINE AVAILABLE MOVES
- Create availableMoves = []
- For i = 0 to 8:
  - IF gameState[i] === '' THEN add i to availableMoves

STEP 2: CHOOSE MOVE
- You can ONLY select an index from availableMoves array
- Any index where gameState[index] !== '' is INVALID

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]

Strategy (ONLY using indices from availableMoves):
1. Find winning move (two 'o' + empty)
2. Find blocking move (two 'x' + empty)
3. Choose from availableMoves prioritizing: center > corners > sides

STEP 3: VALIDATE RESPONSE
- BEFORE returning, verify chosen index exists in availableMoves
- IF chosen index is not in availableMoves, SELECT DIFFERENT MOVE

Return ONLY a JSON object with:
{
  "index": <number from availableMoves>,
  "reason": <string>
}

MAKE SURE THE INDEX is from availableMoves!
`

/*
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.
You will receive:
1. gameState: array of 9 indices using 'x', 'o', and '' for empty spaces

Rules:
- You can only select indices where gameState[index] is empty ('')

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]

IMPORTANT: Before returning a move:
1. First VALIDATE gameState - Note which positions are already taken
2. Only consider empty positions marked as '' when choosing your move
3. Never suggest a position that contains 'x' or 'o'
4. Only return an index that corresponds to an empty position

Strategy priority (ONLY considering empty positions):
1. For each winning combination [a,b,c]:
   - If two positions have 'x' and one is empty, block that empty position
   - If two positions have 'o' and one is empty, take that winning move
2. If no immediate threats/wins, create fork opportunities
3. Take center if available, then corners

Return only a JSON object with:
- index: number (must be an empty position)
- reason: string (brief strategy explanation)

*/


export default function MainSection() {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  // const [gameState, setGameState] = useState([ "x", "o", "x", "o", "", "", "o", "x", "x" ]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)
  const [availableMoves, setAvailableMoves] = useState([])

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
            }),
          }
        ],
      });
      return JSON.parse(msg.content[0].text)

    } catch(error) {
      console.error(error)
      alert("Error while communicating with Claude. Please try again.")
    }
  }

  /*
    useEffect hook to check if there is a win every time the gameState changes
  */
  useEffect(() => {
    // Checking win
    if (gameState[0] !== "" && gameState[0] === gameState[4] && gameState[4] === gameState[8]){
      setIsGameWon(true)
      setWinningElements([0, 4, 8])
    }
    else if (gameState[2] !== "" && gameState[2] === gameState[4] && gameState[4] === gameState[6]){
      setIsGameWon(true)
      setWinningElements([2, 4, 6])
    }
    else  {
      // check horizontal / vertical
      for (let i = 0; i <= 2; i++){
        if (gameState[(3*i)] === gameState[(3*i)+1] && gameState[(3*i)+1] === gameState[(3*i)+2] && gameState[(3*i)+2] !== ""){
          setIsGameWon(true)
          setWinningElements([(3*i), (3*i)+1, (3*i)+2])
        }
        else if (gameState[i] === gameState[i+3] && gameState[i+3] === gameState[i+6] && gameState[i+6] !== ""){
          setIsGameWon(true)
          setWinningElements([i, i+3, i+6])
        }
      }
    }

    // Checking draw
    if (!isGameWon && gameState.filter(cell => cell === "").length === 0) {
      console.log("we have a draw")
      setIsGameDrawn(true)
    }
  }, [gameState])

  /*
    useEffect hook to check if it is the AI's turn
  */
  useEffect(() => {
     // Only handle AI moves, with a small delay to ensure state updates are processed
    if (!playersTurn && !isGameWon && !isGameDrawn) {
      const timeoutId = setTimeout(() => {
        getMoveFromClaude(ANTHROPIC_PROMPT)
          .then(response => {
            console.log(response);
            updateGameboard(response.index);
          })
          .catch((err) => {
            console.error(err);
          });
      }, 0);
      
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
      setPlayersTurn(prev => !prev);
    }
    else {
     console.log("error updating gameboard")
    //  if there is an error, update a random move
    }
  }

  function resetGame() {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(true)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
    setAvailableMoves([]);
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