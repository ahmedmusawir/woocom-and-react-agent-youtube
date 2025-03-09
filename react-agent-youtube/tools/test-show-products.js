// test-show-products-tool.js - Manual Testing Script for LangChain Tool

import { showProductsTool } from "./show-products.js";

async function testShowProducts() {
  console.log("\n🔹 Testing Page 1:");
  console.log(await showProductsTool.invoke({ page: 1 }));

  console.log("\n🔹 Testing Page 2:");
  console.log(await showProductsTool.invoke({ page: 2 }));

  console.log("\n🔹 Testing Last Page:");
  console.log(await showProductsTool.invoke({ page: "last" }));

  console.log("\n🔹 Testing Invalid Page:");
  console.log(await showProductsTool.invoke({ page: 99 }));
}

testShowProducts();
