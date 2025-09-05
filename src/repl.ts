import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import { initState, State } from "./state.js";

export function startREPL(state: State) {
    // const rl = createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    //     prompt: "pokedex > ",
    // });
    // const state = initState();

    state.rl.prompt();

    state.rl.on("line", async (input) => {
        const words = cleanInput(input);
        if(words.length === 0) {
            state.rl.prompt();
            return
        }

        const commandName = words[0];
        // const commandName = state.commands[0];
        // const commands = getCommands();
        const command = state.commands[commandName];

        if (!command) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
            state.rl.prompt();
            return;
        }

        try {
            command.callback(state);
        } catch (err) {
            console.log(err);
        }
        // if (commandName === "exit") {
        //     commandExit(commandRegistry);
        // } else if (commandName === "help") {
        //     commandHelp(commandRegistry);
        // }
        // console.log(`Your command was: ${commandName}`);
        state.rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
   return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(word => word !== '');
}
