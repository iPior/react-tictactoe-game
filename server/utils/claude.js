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

Strategy priority (you MUST check these in order and ONLY select from availableMoves):

1. IMMEDIATE WIN CHECK: Look at each winning combination [a,b,c]:
   If you find a combination with 2 'o's AND 1 empty space, take that empty space

2. IMMEDIATE BLOCK CHECK: Look at each winning combination [a,b,c]:
   If you find a combination with 2 'x's AND 1 empty space, take that empty space

3. If no immediate win or block needed:
   - Take center (position 4) if available
   - Otherwise take a corner (positions 0,2,6,8) if available
   - Otherwise take any available move

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

export async function getMoveFromClaude(gameBoard, availableMoves) {
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022", // claude-3-haiku-20240307
        max_tokens: 2000,
        system: ANTHROPIC_PROMPT,
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