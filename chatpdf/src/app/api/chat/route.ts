import {Configuration, OpenAIApi} from 'openai-edge';
import {StreamingTextResponse, streamText } from 'ai';


export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
    try {
        const {messages} = await req.json()
        const response = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages,
            stream: true,
          });
        console.log()

        
        return response;
    } catch (error) {
        console.log(error)
        return error;
    }
}