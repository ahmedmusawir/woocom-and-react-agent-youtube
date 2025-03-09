import 'dotenv/config'; // Import and configure dotenv
import { ChatOpenAI } from '@langchain/openai';
import readline from 'node:readline/promises'; // Use the promises API for readline
import { stdin as input, stdout as output } from 'node:process';

// Initialize the ChatOpenAI model
const model = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0.7,
});

console.log('Chat with the Assistant! Type "exit" to quit.\n');

// Create a readline interface for user input
const rl = readline.createInterface({ input, output });

// Function to handle the chat loop
const chatLoop = async () => {
  while (true) {
    const userPrompt = await rl.question('You: ');

    if (userPrompt.toLowerCase() === 'exit') {
      console.log('Exiting... Goodbye!');
      rl.close();
      process.exit(0);
    }

    try {
      // Use the model to generate a response
      const result = await model.invoke(userPrompt);
      console.log(`Assistant: ${result.content}`);
    } catch (err) {
      console.error('Error:', err);
    }

    console.log('-'.repeat(50)); // Separator for better readability
  }
};

// Start the chat loop
chatLoop();
