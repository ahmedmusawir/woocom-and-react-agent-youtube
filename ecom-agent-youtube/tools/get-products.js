// tools/get-products.js - Fetch Products from WooCommerce

import "dotenv/config";
import fetch from "node-fetch";
import fs from "fs";
import { summarizeText } from "./summarize-text.js";

// Load WooCommerce API credentials
const WOOCOM_REST_API_URL = process.env.WOOCOM_REST_API_URL;
const WOOCOM_CONSUMER_KEY = process.env.WOOCOM_CONSUMER_KEY;
const WOOCOM_CONSUMER_SECRET = process.env.WOOCOM_CONSUMER_SECRET;

// Function to remove HTML tags
function removeHTMLTags(htmlString) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}

// Function to fetch and clean products
export async function getProducts(page = 1, perPage = 15) {
  if (!WOOCOM_REST_API_URL || !WOOCOM_CONSUMER_KEY || !WOOCOM_CONSUMER_SECRET) {
    throw new Error("Missing WooCommerce API credentials.");
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
        console.log(
          `\n🔹 [Raw Description] for ${product.name}:`,
          product.description
        );

        const cleanDescription = removeHTMLTags(product.description);
        console.log(`✅ [Cleaned Description]:`, cleanDescription);

        // 🔥 Now calling our separate function
        const summary = await summarizeText(cleanDescription);

        return {
          id: product.id,
          name: product.name,
          description: summary, // AI summarized description
          price: parseFloat(product.price) || 0,
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
