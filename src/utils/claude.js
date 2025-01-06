import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true
});

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

Return only a JSON object with only:
- index: number (must be a number from availableMoves)
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
      alert("Error while communicating with Claude. Taking a random move.")
    }
  }