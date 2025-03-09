// test-summary.js - Test AI Summarization

import "dotenv/config";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents"; // ✅ Import Document type

// Initialize LangChain LLM
const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

// Define prompt for AI summarization
const prompt = PromptTemplate.fromTemplate(
  "Summarize the following product description in plain text: {context}"
);

// Create AI summarization chain
const summarizeChain = await createStuffDocumentsChain({
  llm,
  outputParser: new StringOutputParser(),
  prompt,
});

// Function to test summarization
async function testSummary() {
  const testDescriptions = [
    "Introducing the Life Saver: Your Dock Organization Solution. Make life easier on the dock with the Life Saver, our most popular product! The Life Saver provides a secure holder for life jackets, floats, or hanging plants, keeping your dock area organized and functional.",
    "The Universal Bloxx is a versatile mounting system that allows you to secure various accessories to your dock, boat, or outdoor area. Built with high-quality materials, it ensures long-lasting durability and resistance to harsh weather conditions.",
    "This is a simple test case to see if the AI can summarize a random paragraph about an imaginary product that has multiple features, usage cases, and some unnecessary fluff that should be omitted.",
  ];

  console.log("\n🔥 Running AI Summarization Test...");

  for (const description of testDescriptions) {
    console.log("\n🔹 [Original Description]:", description);

    try {
      // ✅ Fix: Use `Document` to properly format input
      const docs = [new Document({ pageContent: description })];
      const summary = await summarizeChain.invoke({ context: docs });

      console.log("✅ [Summarized Output]:", summary);
    } catch (err) {
      console.error("⚠️ [Summary Error]:", err.message);
    }
  }
}

// Run the test
await testSummary();
