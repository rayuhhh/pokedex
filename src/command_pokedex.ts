import { State } from "./state.js";


export async function commandPokedex(state: State, ...args: string[]) {
    console.log(`Your Pokedex:`);
   
    for (const key of Object.keys(state.caught)) {
        console.log(` - ${state.caught[key].name}`);
    }
    
}