// import { Readable, Writable } from "stream";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
    const state = initState();
    startREPL(state);
}

main();