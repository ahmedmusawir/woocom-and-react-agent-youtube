import 'dotenv/config'; // ES6 syntax for importing and configuring dotenv
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash-exp',
  // model: 'gemini-1.5-pro',
  maxOutputTokens: 2048,
});

// Use `model.stream` to get a ReadableStream
const result = await llm.invoke(
  'Are you multi-modal model? I mean, image, video etc.'
);
// const result = await llm.invoke('Which LLM are you?');

// console.log('Assistant: ', result);
console.log('Assistant: ', result.content);
