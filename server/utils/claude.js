import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv'
import { anthropicMessage } from './constants.js';
dotenv.config()

const anthropic = new Anthropic();

export async function getMoveFromClaude(gameBoard) {
    try{ 
      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022", // claude-3-haiku-20240307
        max_tokens: 2048,
        system: [
          {
            type: "text",
            text: anthropicMessage,
            cache_control: { type: "ephemeral" }
          }
        ],
        messages: [
          { 
            role: "user", 
            content: JSON.stringify({ gameState: gameBoard }),
          }
        ],
      });
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
          text: anthropicMessage,
          cache_control: { type: "ephemeral" }
        }
      ],
      messages: [
          { 
            role: "user", 
            content: "Preloading prompt. Do not reply until the next message.",
          }
        ],
    });
  } catch(error) {
    console.error(error)
  }
}