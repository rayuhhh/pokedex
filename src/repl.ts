// import { createInterface } from "readline";
// import { getCommands } from "./commands.js";
import { State } from "./state.js";

export async function startREPL(state: State) {
    // state.rl.prompt();

    while (true) {
        try {
            const input = await state.rl.question(state.rl.getPrompt());
            const words = cleanInput(input);

            if (words.length === 0) {
                continue;
            }

            const commandName = words[0];
            const command = state.commands[commandName];

            if (!command) {
                console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
                continue;
            }
            
            await command.callback(state);
            if (commandName === 'exit') {
                break;
            }
        } catch (err) {
             console.log(err);
        }
    }
}
    // state.rl.on("line", async (input) => {
    //     const words = cleanInput(input);
    //     if(words.length === 0) {
    //         state.rl.prompt();
    //         return
    //     }

    //     const commandName = words[0];
    //     // const commands = getCommands();
    //     const command = state.commands[commandName];

    //     if (!command) {
    //         console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
    //         state.rl.prompt();
    //         return;
    //     }

    //     try {
    //         await command.callback(state);
    //     } catch (err) {
    //         console.log(err);
    //     }

    //     state.rl.prompt();
    // });
// }

export function cleanInput(input: string): string[] {
   return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(word => word !== '');
}
