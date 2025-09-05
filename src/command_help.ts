
import { CLICommand } from "./command";
import { State } from "./state.js";
export function commandHelp(state: State) { // commandRegistry: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:");
    console.log();
    for (const commandName in state.commands) {
        const command = state.commands[commandName];
        console.log(`${command.name}: ${command.description}`);
    }
    console.log();
}