import { getProducts } from "./get-products.js"; // Import the function

(async () => {
  console.log("Fetching products...");
  const products = await getProducts(1); // Fetch first 5 products from page 1
  console.log("Fetched Products:", products);
})();
