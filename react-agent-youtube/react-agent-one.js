import "dotenv/config"; // ES6 syntax for importing and configuring dotenv
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { Calculator } from "@langchain/community/tools/calculator";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

// CREATING THE CHAT MODEL
const llm = new ChatOpenAI({
  model: "gpt-4.5-preview-2025-02-27",
});

// CREATING CALCULATOR TOOL
const calTool = new Calculator();

// CREATING SEARCH TOOL
const searchTool = new DuckDuckGoSearch({ maxResults: 5 });

// CREATING THE TOOLS FOR REACT AGENT
const tools = [calTool, searchTool];

// CREATING THE CUSTOM PROMPT
const prompt =
  "This is the year 2025. To find out about current events you must use your tools";

// CREATING THE REACT AGENT
const agent = createReactAgent({ llm, tools, prompt });

// THE USER QUERY
// const query = "When was your last training date?";
// const query = "Who won the superbowl 2025?";
const query =
  "What is the distance when we multiply the earth's circumference by 321?";

// THE AI ANSWER
const answer = await agent.invoke({ messages: [["human", query]] });

console.log("FULL ANSWER:", answer);

// console.log("REACT AGENT: ", answer.messages.slice(-1)[0].content);
