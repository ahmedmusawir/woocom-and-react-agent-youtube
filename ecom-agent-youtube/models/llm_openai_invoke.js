import 'dotenv/config'; // ES6 syntax for importing and configuring dotenv
import { ChatOpenAI } from '@langchain/openai';

const llm = new ChatOpenAI({
  // model: 'gpt-4o-mini',
  model: 'o1-mini',
});

// Use `model.stream` to get a ReadableStream
// const result = await llm.invoke('What LLM are you?');
const result = await llm.invoke(
  'Do you have multi-modal capability ... I mean Images, videos etc.?'
);

// console.log('Assistant: ', result);
console.log('Assistant: ', result.content);
