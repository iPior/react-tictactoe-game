import GameBoard from "./GameBoard"
import Anthropic from '@anthropic-ai/sdk';
import { useState, useEffect } from "react"

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `
You are playing TIC TAC TOE on a linear tic-tac-toe board. The grid will be given to you in the form of a 1x9 array (indices 0 through 8). 
When playing Tic-tac-toe on a 1x9 array, the goal remains the same as traditional Tic-tac-toe: getting three of your marks (x or o) in a row.

The positions 0-8 map to the 3x3 grid in this way:
Positions 0,1,2 form the top row
Positions 3,4,5 form the middle row
Positions 6,7,8 form the bottom row

You can win by getting three in a row in any of these ways:
Horizontally: [0,1,2], [3,4,5], or [6,7,8]
Vertically: [0,3,6], [1,4,7], or [2,5,8]
Diagonally: [0,4,8] or [2,4,6]

Of the nine indicies to make a move on, if the index is an empty string, then that spot is available to you to make a move. You can not make a move in a taken index (this is really important). 
Taken indicies will be denoted by a 'x' for your opponents moves and 'o' for your moves. 

Your goal is to get three 'o' indicies in a winning row mentioned above. 

Return the index of the move you are making and no other text. Make sure it is not in an index that already has a move made in it, if you are not sure return a random free index.
`

const SYSTEM_PROMPT_SIMPLE = `
You are playing TIC TAC TOE on a linear tic-tac-toe board. You will receive the gameboard as an array where each index is a grid square as well as an array of available moves. 

Player one will use 'x' to denote their moves, and player two will use 'o'. You are player 2.
If the index is an empty string, then that spot is available to you to make a move. 

You can not make a move in a taken index (this is really important). 

Return the index of the move you are making and no other text.
`

const SYSTEM_PROMPT_SIMPLE_v2 = `
You are playing TIC TAC TOE on a linear tic-tac-toe board. You should be trying to win as soon as possible.

You will receive the gameboard as an array where each index is a grid square as well as an array of available moves.
The gameboard is a representation of the game state and the available moves array is a representation of the possible moves to continue in the game. 

Player one will use 'x' to denote their moves, and player two will use 'o'. You are player 2.

Return the index of the move you are making and no other text. The index must be inside the available moves array. 
`

const ANTHROPIC_PROMPT = `
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
1. Check gameState[index] === '' for your chosen position
2. Never select an index that contains 'x' or 'o'
3. Only return an index that corresponds to an empty position

Strategy priority:
1. For each winning combination [a,b,c]:
   - If two positions have 'x' and one is empty, block that empty position
   - If two positions have 'o' and one is empty, take that winning move
2. If no immediate threats/wins, create fork opportunities
3. Take center if available, then corners

Return only a JSON object with:
- index: number (must be an empty position)
- reason: string (brief strategy explanation)
`

/*
For each turn:
1. Look at the current board state
2. Analyze the game situation
3. Make your move using optimal strategy
4. Make sure the index is available
5. Return a response which should be an object with the index of the move, and brief reasoning of the move. Let the keys be 'index' and 'reason' respectively.

When analyzing moves, prioritize:
- Winning moves
- Blocking opponent's winning moves
- Creating fork opportunities (multiple winning threats)
- Controlling the center and corners

Keep the reasoning to yourself and only respond with the object.
*/


export default function MainSection() {
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const [winningElements, setWinningElements] = useState([]);
  const [playersTurn, setPlayersTurn] = useState(true)
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameDrawn, setIsGameDrawn] = useState(false)
  const [moveHistory, setMoveHistory] = useState([])

  // claude-3-5-sonnet-20241022
  // claude-3-haiku-20240307

  async function getMoveFromClaude(prompt) {
    // console.log(gameState, moveHistory)
    // return
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1500,
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

  // bug where the ai still makes a move after the game has been won

  useEffect(() => {
    checkWin()
    checkDraw()
    if (!playersTurn && (!isGameWon || !isGameDrawn)) {
      getMoveFromClaude(ANTHROPIC_PROMPT)
        .then(response => {
          console.log(response) 
          updateGameboard(response.index) 
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
      setMoveHistory(prev => [...prev, gameState])
      setPlayersTurn(!playersTurn)
    }
    else {
     console.log("error updating gameboard")
    }
  }

  function resetGame() {
    setGameState(["","","","","","","","",""])
    setPlayersTurn(true)
    setIsGameWon(false)
    setIsGameDrawn(false)
    setWinningElements([])
    setMoveHistory([])
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