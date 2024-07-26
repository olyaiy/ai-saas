import { openai } from '@ai-sdk/openai';
import {streamText} from 'ai'

export const maxDuration = 30;

export async function POST(req: Request) {
    try {


        
        const { messages } = await req.json();
        const result = await streamText({
            model: openai('gpt-4o-mini'),
            messages,
          });

        return result.toAIStreamResponse();
          
      
    } catch (error) {
    }
}