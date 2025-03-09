import 'dotenv/config'; // ES6 syntax for importing and configuring dotenv
import { ChatGroq } from '@langchain/groq';

const model = new ChatGroq({
  model: 'mixtral-8x7b-32768',
  // model: 'llama-3.3-70b-versatile',
  temperature: 0,
});

// Use `model.stream` to get a ReadableStream
const result = await model.invoke('What llm are you?');
// const result = await model.invoke(
//   'Do you know what the company Meta used to be called?'
// );

console.log('Assistant: ', result.content);
