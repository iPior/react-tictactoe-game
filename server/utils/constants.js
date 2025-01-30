const FORMAT = `{
  reasoning: string,
  gamestate: array,
}
`

const WINNING_COMBINATIONS = `
Below are the winning combinations. 

WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],  // horizontal
  [0,3,6], [1,4,7], [2,5,8],  // vertical
  [0,4,8], [2,4,6]            // diagonal
]
`

const INSTRUCTIONS = `
You are playing Tic-Tac-Toe on a 1x9 array with indices labeled from 0 to 8.

You play as 'o' and your opponent (human) plays as 'x'.
You will receive:
    gameState: an array of 9 indices, where each index is either 'x', 'o', or '' (empty).

You will return a JSON response of the gamestate with one of the empty strings ('') replaced by 'o', indicating your move. Y
ou will include your reasning in the JSON response with the key "reasoning".

You are only to make a turn on an index with an empty string!

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

const MINIMAX = `
Here’s how you can use Minimax in Tic Tac Toe:

1. **Game Tree Construction**:
   - Start with an empty 3x3 grid.
   - At each step, evaluate all possible moves (children nodes) by placing either 'X' or 'O' on the board.

2. **Evaluation Function**:
   - Assign a score to each game state based on proximity to winning conditions.
     - +1 for a win,
     - -1 for a loss,
     - 0 for a draw.

3. **Recursive Evaluation**:
   - Evaluate each child node by switching turns between players until reaching a terminal state (win, loss, or
draw).
   - The leaves of the game tree are scored based on whether they represent a win, loss, or draw for the current
player.

4. **Decision Making**:
   - If it's your turn ('O'), choose the move with the highest score to maximize your chances.
   - If it's your opponent's turn ('X'), choose moves that minimize your score to block potential wins.

5. **Optimal Play**:
   - By following Minimax, you can force at least a draw in Tic Tac Toe.
   - Implementing Minimax requires coding it into the game logic to simulate all possible moves and outcomes.

6. **Implementation Steps**:
   - Simulate the game by building a decision tree for each move.
   - Use recursion to evaluate all possible future states.
   - Select the best move based on the evaluation scores.

7. **Considerations**:
   - In practice, Minimax can be computationally intensive but manageable in Tic Tac Toe due to the limited number
of moves (9 squares).
   - The first player ('X') has a slight advantage if both play optimally.

By applying Minimax principles—evaluating all possible moves and selecting optimal ones—you can ensure at least a
draw.
`

export const anthropicMessage = JSON.stringify({
  instructions: INSTRUCTIONS,
  algorithm: MINIMAX,
  responseFormat: FORMAT,
  winningCombinations: WINNING_COMBINATIONS,
})