import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("You must provide a location name");
    }
    const locationName = args[0];
    const location = await state.pokeAPI.fetchLocation(locationName);

    console.log(`Exploring ${locationName}...`);
    console.log("Found Pokemon:");
    for (const enc of location.pokemon_encounters) {
        console.log(` - ${enc.pokemon.name}`);
    }
}