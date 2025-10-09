import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("You must provide a pokemon name");
    }

    const pokemonName = args[0];
    const pokemon = state.caught[pokemonName];
    if (!pokemon) {
        throw new Error("You have not caught that pokemon");
    }
   
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log("Types:");
    for (const typeInfo of pokemon.types) {
        console.log("  -", typeInfo.type.name);
    }
}