import 'dotenv/config'; // ES6 syntax for importing and configuring dotenv
import { ChatAnthropic } from '@langchain/anthropic';

const llm = new ChatAnthropic({
  // model: 'claude-3-haiku-20240307',
  model: 'claude-3-5-sonnet-20240620',
  temperature: 0.5,
});

// Use `model.stream` to get a ReadableStream
const result = await llm.invoke('What LLM are you?');
// const result = await llm.invoke('Write a small Javascript?');

// console.log('Assistant: ', result);
console.log('Assistant: ', result.content);
