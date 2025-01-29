import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv'
import { ANTHROPIC_PROMPT, ANTHROPIC_PROMPT_OLD } from './constants.js';
dotenv.config()

const anthropic = new Anthropic();

export async function getMoveFromClaude(gameBoard, availableMoves) {
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022", // claude-3-haiku-20240307
        max_tokens: 2048,
        system: [
        {
          type: "text",
          text: ANTHROPIC_PROMPT_OLD,
          cache_control: {type: "ephemeral"}
        },
      ],
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
      console.log(msg)
      return JSON.parse(msg.content[0].text)

    } catch(error) {
      console.error(error)
    }
  }

export async function claudePreRender() {
  try{ 
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022", // claude-3-haiku-20240307
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: ANTHROPIC_PROMPT_OLD,
          cache_control: {type: "ephemeral"}
        },
      ],
      messages: [
          { 
            role: "user", 
            content: "Preloading prompt. Please remember to return only a valid JSON object containing a single 'index' field, which is a number between 0-8 representing the index of the position you want to play",
          }
        ],
    });
    console.log(msg)
  } catch(error) {
    console.error(error)
  }
}