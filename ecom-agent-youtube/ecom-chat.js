// ecom-chat.js - Chat-based CLI for ReAct AI Agent

import "dotenv/config";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { showProductsTool } from "./tools/show-products.js";

// Initialize the AI model
const llm = new ChatOpenAI({ model: "gpt-4o" });

// Define tools available to the agent
const tools = [showProductsTool];

// Initialize memory to persist state across queries
const checkpointer = new MemorySaver();

// Create the ReAct AI Agent
const ecomAgent = createReactAgent({
  llm,
  tools,
  checkpointSaver: checkpointer,
});

// Chatbot setup
console.log("\n Chat with your Ecom AI Assistant! Type 'exit' to quit.\n");
const rl = readline.createInterface({ input, output });

// Function to handle chat loop
const chatLoop = async () => {
  while (true) {
    const userPrompt = await rl.question("You: ");

    if (userPrompt.toLowerCase() === "exit") {
      console.log("Exiting... Goodbye!");
      rl.close();
      process.exit(0);
    }

    try {
      const response = await ecomAgent.invoke(
        { messages: [{ role: "user", content: userPrompt }] },
        { configurable: { thread_id: 1 } }
      );
      console.log(`Assistant: ${response.messages.at(-1)?.content}`);
    } catch (err) {
      console.error("Error:", err);
    }

    console.log("-".repeat(50)); // Separator for better readability
  }
};

// Start the chat loop
chatLoop();
