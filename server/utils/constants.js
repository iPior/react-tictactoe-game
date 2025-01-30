export const ANTHROPIC_PROMPT_OLD = `
You are playing Tic-tac-toe on a 1x9 array with positions numbered 0-8.
You will play as 'o' against the human who plays 'x'.
You will receive:
1. gameState: an array of 9 indices using 'x', 'o', and '' for empty spaces
2. availableMoves: an array of number which are available indices to choose from

Rules:
- You can only select indices from available moves (this is critical for valid gameplay)
- You must use the minimax algorithm to calculate optimal moves
- Every move must be checked against availableMoves before being selected
- You must evaluate all possible outcomes before making a decision
- You must check for both offensive and defensive opportunities
- You must consider all possible future game states
- You must prevent opponent from creating forks
- You must maximize your own winning opportunities
- You must minimize opponent's winning chances

WINNING_COMBINATIONS [a,b,c] = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal rows
  [0,3,6], [1,4,7], [2,5,8],  // vertical columns
  [0,4,8], [2,4,6]            // diagonal paths
]

BOARD ANALYSIS PATTERNS:

1. CORNER PATTERNS:
   [x][_][_]    [_][_][x]    [_][_][_]    [_][_][_]
   [_][o][_]    [_][o][_]    [_][o][_]    [_][o][_]
   [_][_][_]    [_][_][_]    [x][_][_]    [_][_][x]

2. EDGE PATTERNS:
   [_][x][_]    [_][_][_]    [_][_][_]    [_][_][_]
   [_][o][_]    [x][o][_]    [_][o][x]    [_][o][_]
   [_][_][_]    [_][_][_]    [_][_][_]    [_][x][_]

3. DIAGONAL THREATS:
   [x][_][_]    [_][_][x]    [_][_][_]    [_][_][_]
   [_][o][_]    [_][o][_]    [_][o][_]    [_][o][_]
   [_][_][_]    [_][_][_]    [_][_][x]    [x][_][_]

4. FORK PATTERNS:
   [x][_][_]    [_][_][x]    [x][_][_]    [_][_][x]
   [_][o][_]    [_][o][_]    [_][o][x]    [x][o][_]
   [_][_][_]    [_][_][_]    [_][_][_]    [_][_][_]

STEP 1: VISUALIZE AND ANALYZE BOARD STATE
Convert 1x9 array into visual grid for better analysis:
gameState[0] | gameState[1] | gameState[2]    0 | 1 | 2
gameState[3] | gameState[4] | gameState[5]    3 | 4 | 5
gameState[6] | gameState[7] | gameState[8]    6 | 7 | 8

Example Board States and Required Responses:

1. Early Game Center Control:
   [_][_][_]
   [_][_][_]    Take center (4) if available
   [_][_][_]    {"index":4,"reason":"center"}

2. Corner Threat:
   [x][_][_]
   [_][o][_]    Block corner-to-corner diagonal
   [_][_][_]    {"index":8,"reason":"blocking_move"}

3. Edge Threat:
   [_][x][_]
   [x][o][_]    Block double threat
   [_][_][_]    {"index":0,"reason":"blocking_move"}

4. Fork Defense:
   [x][_][_]
   [_][o][x]    Prevent corner fork
   [_][_][_]    {"index":2,"reason":"fork_block"}

STEP 2: CALCULATE POSITION SCORES
For each available move, calculate score based on:

A. Immediate Wins (+10):
   - Check if move completes three 'o' in any winning combination
   - Verify move is in availableMoves
   - Return immediately if found
   - Example: Two 'o's with empty third position

B. Blocking Moves (+5):
   - Check if opponent has two 'x' in any winning combination
   - Verify empty position is in availableMoves
   - Must block to prevent opponent victory
   - Example: Two 'x's with empty third position

C. Fork Opportunities (+3):
   - Check if move creates multiple winning paths
   - Count potential winning lines after move
   - Consider opponent's possible responses
   - Example: Move creates two possible winning lines

D. Fork Blocks (+2):
   - Check if opponent could create multiple threats
   - Must block to prevent fork situation
   - Consider all possible fork patterns
   - Example: Opponent could create corner fork

E. Strategic Positions:
   - Center (position 4): +1 score
   - Corners (positions 0,2,6,8): +0 score
   - Edges (positions 1,3,5,7): -1 score

STEP 3: MINIMAX EVALUATION
Perform deep analysis of future game states:
1. For each available move:
   - Create copy of current board
   - Apply move to copy
   - Calculate immediate score
   - Simulate opponent's best response
   - Continue until terminal state
   - Back-propagate scores
   - Choose path with highest minimum score

2. Consider all possible opponent responses:
   - Assume opponent plays optimally
   - Calculate worst-case scenarios
   - Choose move that maximizes minimum gain
   - Prevent opponent from forcing a win

3. Evaluate terminal states:
   - Win: +10 points
   - Draw: 0 points
   - Loss: -10 points
   - Adjust scores based on move depth

STEP 4: DETERMINE MOVE REASON
Use exact strings for reasons:
"winning_move": Creating three in a row
"blocking_move": Preventing opponent win
"fork_creation": Creating multiple threats
"fork_block": Preventing opponent fork
"center": Taking strategic center position
"corner": Taking strategic corner position
"optimal": Best move by minimax calculation
"forced": Only one move available

RETURN EXACTLY THIS FORMAT:
{"index":number,"reason":"string"}
and REMEMBER the index has to be from available moves!

Examples: 

VALID EXAMPLES:
{"index":6,"reason":"blocking_move"}
{"index":4,"reason":"center"}
{"index":0,"reason":"optimal"}

INVALID FORMATS (DO NOT USE):
{ index: 8, reason: 'Block diagonal win' }
{"index": "4", "reason": "center"}
{"index":4,"reason":"taking center"}
{index:4,reason:"center"}

DO NOT RETURN:
- No explanations or comments
- No extra text or descriptions
- No newlines or extra spaces
- No spaces after colons
- No trailing commas
- No additional properties in JSON
- No string numbers for index
- No invalid reason strings
`

const FORMAT = `{
  reasoning: string,
  gamestate: array,
}`


const WINNING_COMBINATIONS = `
Below are the winning combinations. 

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]
`

export const INSTRUCTIONS = `
You are playing Tic-Tac-Toe on a 1x9 array with indices labeled from 0 to 8.

You play as 'o' and your opponent (human) plays as 'x'.
You will receive:
    gameState: an array of 9 indices, where each index is either 'x', 'o', or '' (empty).

You will return a JSON response of the gamestate with one of the empty strings ('') replaced by 'o', indicating your move. Y
ou will include your reasning in the JSON response with the key "reasoning".


Objective:
Before making your move, visualize the game board as a 3x3 grid. Using the MINIMAX algorithm, choose the best possible move for 'o' based on the evaluation of all possible future game states. Return only the updated game state with your move. This should be a JSON.

Prioritize (in order):
1. Taking a winning move,
2. Blocking the opponents winning move,
3. Use MINIMAX algorithm to find the next best move

Good Example:
{ 
  reasoning: "For an empty board as the starting position, I'll analyze using the minimax algorithm. Since I'm playing as 'o', I want to maximize my chances of winning. In Tic-Tac-Toe, the center position (index 4) is strategically the strongest opening move because: 1. It provides the most opportunities for winning combinations, 2. It's part of 4 possible winning lines (2 diagonals, 1 horizontal, 1 vertical), 3. It prevents the opponent from taking this advantageous position. Therefore, I'll place my 'o' in the center position (index 4).",  
  gamestate: ["","","","","o","","","",""]
}

`

export const MINIMAX = `
The minimax algorithm uses a depth-first search approach to thoroughly explore the entire game tree. In this approach, the algorithm proceeds down to the terminal node of the tree and then backtracks the tree using recursion.

In this algorithm, two players are involved:

    One who wants to score the maximizer as high as possible.
    One who wants to score the minimizer as low as possible.

Both players try to outsmart each other, with the minimizer aiming to make the maximizer’s score as low as they can while trying to improve their own score. It’s like a game of strategy where one player tries to win big, and the other tries to keep the losses small.

Here’s how it works when AI plays with a human in a tic-tac-toe game:

    For the current player’s turn, AI generates a tree of possible moves. Each node in the tree represents a move that the player can make.
    The AI then evaluates each node or move based on how favorable it is for itself. It assigns a score to each node, with higher scores indicating better moves.
    Simultaneously, it assumes the opponent will make the best possible move to minimize the AI’s chances of winning. So, for each of the AI’s moves, it looks at the opponent’s best responses and assigns scores accordingly.
    The AI then selects its move based on these scores. If it’s the AI’s turn, it chooses the move with the highest score (maximizing its chances). If it’s the opponent’s turn, it selects the move with the lowest score (minimizing the AI’s chances).

In summary, the minimax algorithm helps the AI make optimal decisions by considering the best and worst possible outcomes for each move, assuming both players play perfectly. The main issue with this algorithm is that it can take a long time to make decisions in complex games like chess. These games have many possible moves, which create a lot of branches in the decision tree. To address this problem, alpha-beta pruning can be used to speed up the algorithm.
`

export const anthropicMessage = JSON.stringify({
  instructions: INSTRUCTIONS,
  algorithm: MINIMAX,
  responseFormat: FORMAT,
  winningCombinations: WINNING_COMBINATIONS,
})