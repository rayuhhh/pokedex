import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays a list of next 20 visitable locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays previous list of 20 visitable locations",
            callback: commandMapb,
        },
        explore: {
            name: "explore <location_name>",
            description: "Explore a location by showing pokemon found in area",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Attempts to catch a pokemon",
            callback: commandCatch,
        }
    };
}