import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>//ReturnType<typeof getCommands>;  
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    const commands = getCommands();
    return {
        rl: rl,
        commands: commands,
    }
    
}



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};