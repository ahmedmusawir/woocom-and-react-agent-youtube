// tools/test-summarize-text.js - AI Summarization Test

import { summarizeText } from "./summarize-text.js";

async function testSummarization() {
  const testDescriptions = [
    "Introducing the Life Saver: Your Dock Organization Solution. Make life easier on the dock with the Life Saver, our most popular product! The Life Saver provides a secure holder for life jackets, floats, or hanging plants, keeping your dock area organized and functional.",
    "The Universal Bloxx is a versatile mounting system that allows you to secure various accessories to your dock, boat, or outdoor area. Built with high-quality materials, it ensures long-lasting durability and resistance to harsh weather conditions.",
    "This is a simple test case to see if the AI can summarize a random paragraph about an imaginary product that has multiple features, usage cases, and some unnecessary fluff that should be omitted.",
  ];

  console.log("\n🔥 Running Summarization Tests...");

  for (const description of testDescriptions) {
    console.log("\n🔹 [Original Description]:", description);

    try {
      const summary = await summarizeText(description);
      console.log("✅ [Summarized Output]:", summary);
    } catch (err) {
      console.error("⚠️ [Summary Error]:", err.message);
    }
  }
}

// Run the test
await testSummarization();
