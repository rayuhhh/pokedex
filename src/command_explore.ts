import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    console.log(locationName);
    try {
        const locationResponse = await state.pokeAPI.fetchLocation(locationName);
        console.log(`Exploring ${locationResponse.name}...`);

        const encounters = locationResponse.pokemon_encounters;

        if (encounters && encounters.length > 0) {
            console.log("Found Pokemon:");
            for (const encounter of encounters) {
                console.log(` - ${encounter.pokemon.name}`);
            }
        } else {
            console.log(`No Pokemon encounter data found for ${locationResponse.name}.`);
        }
    } catch (err) {
        console.log(err);
    }
}