// tools/summarize-text.js - AI Summarization Utility
import "dotenv/config";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

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

// Function to summarize text
export async function summarizeText(description) {
  if (!description || description.trim() === "") {
    return "No description available.";
  }

  try {
    const docs = [new Document({ pageContent: description })];
    return await summarizeChain.invoke({ context: docs });
  } catch (err) {
    console.error("⚠️ [Summarization Error]:", err.message);
    return "No summary available.";
  }
}
