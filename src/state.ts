import { createInterface, type Interface } from "node:readline/promises";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";


export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;  
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    caught: Record<string, Pokemon>;
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
        caught: {},
    };
}



export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};