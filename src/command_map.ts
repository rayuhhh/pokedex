import { State } from "./state.js";

export async function commandMap(state: State) {
    try {
        const locationResponse = await state.pokeAPI.fetchLocations(state.nextLocationsURL ?? undefined);
        state.prevLocationsURL = locationResponse.previous;
        state.nextLocationsURL = locationResponse.next;
        for (const area of locationResponse.results) {
            console.log(area.name);
        }
    } catch (err) {
        console.log(err);
    }
}

export async function commandMapb(state: State) {
    if (state.prevLocationsURL === null) {
        console.log("You're on the first page");
        return;
    }
    try {   
        const locationResponse = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
        state.prevLocationsURL = locationResponse.previous;
        state.nextLocationsURL = locationResponse.next;
        for (const area of locationResponse.results) {
            console.log(area.name);
        }
    } catch (err) {
        console.log(err);
    }
}