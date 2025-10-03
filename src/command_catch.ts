import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("You must provide a pokemon name");
    }
    
    const pokemonName = args[0];
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catched = pokemon.base_experience * Math.random();
    console.log(`Throwing a Pokeball at ${args[0]}...`);
    if (catched >= 0.2) {
        console.log(`${pokemonName} was caught!`);
    } else {
        console.log(`${pokemonName} escaped!`);
    }

}