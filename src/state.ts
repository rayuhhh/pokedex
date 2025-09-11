import { createInterface, type Interface } from "node:readline/promises";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;  
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    });
    
    return {
        rl: rl,
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: null,
        prevLocationsURL: null,
    };
}



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};