import GameBoard from "./GameBoard"
import Anthropic from '@anthropic-ai/sdk';
import { check } from "prettier";
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRobot, faUser} from '@fortawesome/free-solid-svg-icons'

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});


const ANTHROPIC_PROMPT_v3 = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.
You will receive:
1. gameState: an array of 9 indices using 'x', 'o', and '' for empty spaces
2. availableMoves: an array of numbers which are available indices to choose from

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]

MOVE SELECTION ALGORITHM:
1. FOR EACH combination [a,b,c] in WINNING_COMBINATIONS:
   - Set oCount = 0, xCount = 0, emptyPos = null
   - Check each position (a,b,c):
     * IF gameState[pos] === 'o': oCount++
     * IF gameState[pos] === 'x': xCount++
     * IF gameState[pos] === '': emptyPos = pos
   - IF oCount === 2 AND emptyPos !== null AND emptyPos in availableMoves:
     IMMEDIATELY RETURN {
       "index": emptyPos,
       "reason": "Taking winning move"
     }

2. Only if no winning move found, repeat the same check for blocking moves (xCount === 2)

3. Only if no wins or blocks:
   - Take center (4) if in availableMoves
   - Take corner (0,2,6,8) if in availableMoves
   - Take any available move

MUST check EVERY combination COMPLETELY before moving to next priority.
`


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

const ANTHROPIC_PROMPT_OLD = `
YYou are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
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



export default function MainSection(props) {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  // const [gameState, setGameState] = useState([ "x", "o", "x", "o", "", "", "o", "x", "x" ]);
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
    //  if there is an error, update a random move
    }
  }

  function resetGame() {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(true)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
    setAvailableMoves([0,1,2,3,4,5,6,7,8]);
  }
  
  return (
    <div
      className=" w-full max-sm:h-full flex flex-col sm:justify-center items-center align-middle "
    >
      <div className="w-full p-4 shadow-2xl rounded-t-3xl
        border-4 border-b-0 border-opacity-20 bg-dark border-white text-white">
      {isGameWon && (
        <div className="text-center text-3xl sm:text-5xl font-bold ">
          {
            playersTurn ?
              <><FontAwesomeIcon icon={faRobot}/> Claude wins!</> :
              <><FontAwesomeIcon icon={faUser}/> You win!</>
          }
        </div>
      )}
      {isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold sm:mb-4">
          {"Draw"}
        </div>
      )}
      
      {!isGameWon && !isGameDrawn && (
        <div className="text-center text-3xl sm:text-5xl font-bold mb-2">
          {
            playersTurn ?
              <><FontAwesomeIcon icon={faUser}/> Your turn</> :
              <><FontAwesomeIcon icon={faRobot}/> Claude's turn!</>
          }
        </div>
      )}
      </div>
      <div className="p-4 shadow-2xl
        border-4 border-y-0 border-opacity-60 border-dark text-center">
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
    </div>
  )
} 