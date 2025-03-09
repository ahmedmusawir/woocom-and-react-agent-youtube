import "dotenv/config"; // Load environment variables
import fetch from "node-fetch"; // Ensure fetch is available for Node.js
import fs from "fs"; // File system for saving JSON
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// Load WooCommerce API credentials
const WOOCOM_REST_API_URL = process.env.WOOCOM_REST_API_URL;
const WOOCOM_CONSUMER_KEY = process.env.WOOCOM_CONSUMER_KEY;
const WOOCOM_CONSUMER_SECRET = process.env.WOOCOM_CONSUMER_SECRET;

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

// Function to remove HTML tags
function removeHTMLTags(htmlString) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, ""); // Basic regex to strip HTML tags
}

// Function to fetch and clean products
export async function getProducts(page = 1, perPage = 15) {
  if (!WOOCOM_REST_API_URL || !WOOCOM_CONSUMER_KEY || !WOOCOM_CONSUMER_SECRET) {
    throw new Error(
      "Missing WooCommerce API credentials in environment variables."
    );
  }

  const url = `${WOOCOM_REST_API_URL}/products?per_page=${perPage}&page=${page}&consumer_key=${WOOCOM_CONSUMER_KEY}&consumer_secret=${WOOCOM_CONSUMER_SECRET}&orderby=date&order=asc&status=publish`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    // Process products
    const cleanedProducts = await Promise.all(
      data.map(async (product) => {
        const cleanDescription = removeHTMLTags(
          product.description || "No description available."
        );

        // 🔥 FIX: Wrap in an array so LangChain doesn't throw errors
        const summary = await summarizeChain.invoke({
          context: [cleanDescription],
        });

        return {
          id: product.id,
          name: product.name,
          description: summary, // AI summarized description
          price: parseFloat(product.price) || 0, // Convert to number
          stock_status: product.stock_status,
        };
      })
    );

    // Save to products.json
    fs.writeFileSync("products.json", JSON.stringify(cleanedProducts, null, 2));

    console.log("✅ Products saved successfully!");
    return cleanedProducts;
  } catch (error) {
    console.error("[getProducts] Error:", error.message);
    return [];
  }
}
