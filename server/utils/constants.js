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