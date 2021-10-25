import { moveItems } from "./utils/moveItems.js";

// Help function for demonstration purposes
async function callMove() {
  const res = await moveItems("todo-item");
  console.log(res);
}

// Can be now called in the DevTools console
window.callMove = callMove;
