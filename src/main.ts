import * as game from "./game";

const pre = document.createElement("pre");
pre.textContent = JSON.stringify(game.parse("01111"));
document.querySelector("#app")?.appendChild(pre);
