import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv'
dotenv.config()

const anthropic = new Anthropic();

const ANTHROPIC_PROMPT = `
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

FOLLOW THESE STEPS IN ORDER:

STEP 1: EXAMINE CURRENT BOARD STATE
- Look at each position in gameState array
- Note locations of all 'x' pieces
- Note locations of all 'o' pieces
- Note all empty positions

STEP 2: CHECK FOR IMMEDIATE WIN (your 'o' pieces)
A. Check Verticals:
   IF positions [0,3] both have 'o' AND position 6 is empty: play 6
   IF positions [1,4] both have 'o' AND position 7 is empty: play 7
   IF positions [2,5] both have 'o' AND position 8 is empty: play 8
   (Also check reverse: positions [3,6], [4,7], [5,8])

B. Check Horizontals:
   IF positions [0,1] both have 'o' AND position 2 is empty: play 2
   IF positions [3,4] both have 'o' AND position 5 is empty: play 5
   IF positions [6,7] both have 'o' AND position 8 is empty: play 8
   (Also check reverse: positions [1,2], [4,5], [7,8])

C. Check Diagonals:
   IF positions [0,4] both have 'o' AND position 8 is empty: play 8
   IF positions [2,4] both have 'o' AND position 6 is empty: play 6
   (Also check reverse: positions [4,8], [4,6])

STEP 3: IF NO IMMEDIATE WIN, CHECK FOR REQUIRED BLOCKS (opponent's 'x' pieces)
A. Check Verticals:
   IF positions [0,3] both have 'x' AND position 6 is empty: MUST play 6
   IF positions [1,4] both have 'x' AND position 7 is empty: MUST play 7
   IF positions [2,5] both have 'x' AND position 8 is empty: MUST play 8
   (Also check reverse: positions [3,6], [4,7], [5,8])

B. Check Horizontals:
   IF positions [0,1] both have 'x' AND position 2 is empty: MUST play 2
   IF positions [3,4] both have 'x' AND position 5 is empty: MUST play 5
   IF positions [6,7] both have 'x' AND position 8 is empty: MUST play 8
   (Also check reverse: positions [1,2], [4,5], [7,8])

C. Check Diagonals:
   IF positions [0,4] both have 'x' AND position 8 is empty: MUST play 8
   IF positions [2,4] both have 'x' AND position 6 is empty: MUST play 6
   (Also check reverse: positions [4,8], [4,6])

STEP 4: IF NO WIN OR BLOCK FOUND
1. Take center (position 4) if available
2. Take any corner (positions 0,2,6,8) if available
3. Take any available move

YOU MUST VERIFY YOUR MOVE IS IN availableMoves BEFORE RETURNING IT

IMPORTANT: You must return ONLY a valid JSON object containing a single 'index' field with a number from availableMoves.
No explanations, no other text. Just the JSON object.

Example valid responses:
{"index":3}
{"index":0}

Invalid responses:
Here's my move: {"index":3}
{"index":3, "explanation":"blocking"}
{"index":"3"}
`

const ANTHROPIC_PROMPT_v2 = `You are playing Tic-tac-toe. You play as 'o' against 'x'.
Input:
1. gameState: array of 9 indices with 'x', 'o', or '' (empty)
2. availableMoves: array of available positions

BEFORE CHOOSING ANY MOVE, YOU MUST:
1. ONLY consider moves that are in availableMoves
2. VERIFY every potential move is in availableMoves before selecting it

STEP 1: WINNING MOVES - Check if you can win:
- For each two 'o' pieces you find:
  - IF the third position would make 3-in-a-row
  - AND that position is in availableMoves
  - Take that position

STEP 2: BLOCKING MOVES - Check if you must block:
- For each two 'x' pieces you find:
  - IF the third position would make 3-in-a-row
  - AND that position is in availableMoves
  - Take that position

STEP 3: If no win or block available:
1. IF position 4 is in availableMoves, take it
2. ELSE IF any corner (0,2,6,8) is in availableMoves, take it
3. ELSE take the first position in availableMoves

IMPORTANT: You must return ONLY a valid JSON object containing a single 'index' field with a number from availableMoves.
No explanations, no other text. Just the JSON object.

Example valid responses:
{"index":3}
{"index":0}

Invalid responses:
Here's my move: {"index":3}
{"index":3, "explanation":"blocking"}
{"index":"3"}

EXAMPLE:
For gameState: ["x","","","x","o","","","",""]
availableMoves: [1,2,5,6,7,8]
- You find two 'x' at [0,3]
- Position 6 would complete three-in-a-row
- You check: Is 6 in availableMoves? YES
- Therefore return {"index": 6}`

const ANTHROPIC_PROMPT_v3 = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8. 
You play as 'o' against the human, who plays 'x'.

Input:
1. gameState: an array of 9 elements using 'x', 'o', and '' (for empty spaces).
2. availableMoves: an array of numbers indicating valid indices to choose from.

Rules:
1. You can ONLY select indices from the availableMoves array. This is critical.
2. NEVER choose an index already occupied in gameState.
3. Use the following WINNING_COMBINATIONS to determine your moves:
   [[0,1,2], [3,4,5], [6,7,8],  // horizontal
    [0,3,6], [1,4,7], [2,5,8],  // vertical
    [0,4,8], [2,4,6]]           // diagonal

Strategy Priority (ALWAYS considering indices from availableMoves):
1. Win: If any combination in WINNING_COMBINATIONS has two 'o's and one empty space, take that empty space.
2. Block: If no winning move exists, check if any combination has two 'x's and one empty space. Block that empty space.
3. Fallback: If no win or block is possible:
   - Take the center (index 4) if it is in availableMoves.
   - Otherwise, take a corner (indices 0, 2, 6, 8) if one is in availableMoves.
   - If neither center nor corners are available, take any other index from availableMoves.

Output:
You must return ONLY a valid JSON object with your chosen move, like:
{"index":number}
Do not include any additional text, explanations, or formatting.
`



const ANTHROPIC_PROMPT_vProd = `
You are implementing a Tic-tac-toe algorithm using the Minimax algorithm. 
You will play as 'O' and try to maximize your chances of winning, while the opponent (playing 'X') will attempt to minimize your chances.

The game board is a 1x9 array:
- Each index of the array represents a position on the Tic-tac-toe board (0 to 8).
- A position can be either 'X', 'O', or '' (empty).

The task:
1. Implement the Minimax algorithm to determine the best move for you based on the current state of the board.
2. Use the following steps:
  - Step 1: Check the game state (winner or tie):
    - If 'O' wins, return 10 - depth (where depth is the number of moves made).
    - If 'X' wins, return depth - 10.
    - If it's a tie, return 0.
  - Step 2: If you are maximizing ('O'), iterate over all empty spaces:
    - Try placing 'O' in an empty space, evaluate the resulting board state using Minimax, and track the best score.
    - After each move, reset the board back to its previous state.
  - Step 3: If the opponent is minimizing ('X'), iterate over all empty spaces:
    - Try placing 'X' in an empty space, evaluate the resulting board state using Minimax, and track the worst score for the opponent.
    - After each move, reset the board back to its previous state.
  - Step 4: Return the best score and the corresponding best move for you.

In your move function:
1. Evaluate each possible move using the Minimax algorithm.
2. For each empty space, simulate placing 'O', run Minimax, and choose the move with the highest score.
3. Once the best move is determined, apply it to the game board, display the move, and update the game status.
4. Switch to the opponent's turn, and check if the game is over (win or tie).

You must only return the next move, and ensure the move is valid based on the available positions.

Example valid responses:
{"index":3}
{"index":0}

Invalid responses:
Here's my move: {"index":3}
{"index":3, "explanation":"blocking"}
{"index":"3"}

This will represent the best move for 'O' based on the current state of the board.
`

const prompt = `You are playing Tic-Tac-Toe as 'O' against a human opponent who plays 'X'. The game board is a 1x9 array with positions numbered 0-8, and the board's state is represented by an array with 'X', 'O', and '' (empty) for each position.

Your task is to evaluate the current state of the game and choose the best move based on the Minimax algorithm. You should return the index of the position where you want to play 'O'.

**The rules for the game are:**

1. **Winning combinations:** The following winning combinations must be checked:
   - Rows: [0,1,2], [3,4,5], [6,7,8]
   - Columns: [0,3,6], [1,4,7], [2,5,8]
   - Diagonals: [0,4,8], [2,4,6]

2. **Steps to follow:**
   - **Step 1:** Check if the game has ended (either a win, loss, or tie). You should stop if the game is over.
   - **Step 2:** If the opponent (playing 'X') is about to win, block their move.
   - **Step 3:** If you can win, make that move.
   - **Step 4:** If there is no immediate win or block, use the Minimax algorithm to find the optimal move:
     - If it's your turn ('O'), maximize your score.
     - If it's the opponent's turn ('X'), minimize your score.

3. **You must return only a valid JSON object containing a single 'index' field, which is a number between 0-8 representing the index of the position you want to play.**

Example valid response:
{"index":4}
`

export async function getMoveFromClaude(gameBoard, availableMoves) {
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022", // claude-3-haiku-20240307
        max_tokens: 2500,
        system: prompt,
        messages: [
          { 
            role: "user", 
            content: JSON.stringify({
                gameState: gameBoard,
                availableMoves: availableMoves
            }),
          }
        ],
      });
      return JSON.parse(msg.content[0].text)

    } catch(error) {
      console.error(error)
    }
  }