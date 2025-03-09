import { tool } from "@langchain/core/tools";
import fs from "fs";
import { z } from "zod";

// Load product data
const products = JSON.parse(fs.readFileSync("products.json", "utf8"));
const PRODUCTS_PER_PAGE = 5;

// ✅ Define the LangChain-compatible tool
export const showProductsTool = tool(
  async ({ page }) => {
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    let currentPage = page === "last" ? totalPages : Number(page);

    if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
      return JSON.stringify({
        error: "Invalid page number. Use 1, 2, or last.",
      }); // ✅ Ensure JSON string response
    }

    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const productSet = products.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );

    return JSON.stringify({
      // ✅ Ensure AI gets a valid structured JSON response
      products: productSet.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: `$${p.price.toFixed(2)}`,
        stock_status: p.stock_status,
      })),
      message:
        currentPage === totalPages
          ? "That's all I've got, boss!"
          : "More available.",
    });
  },
  {
    name: "show_products",
    description:
      "Fetches a paginated list of products. Provide a page number (1, 2, last).",
    schema: z.object({
      page: z
        .union([z.string(), z.number()])
        .describe("The page number to fetch (1, 2, last)."),
    }),
  }
);
