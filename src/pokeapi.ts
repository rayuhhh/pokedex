import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(interval: number) {
        this.cache = new Cache(interval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

        const cachedEntry = this.cache.get<ShallowLocations>(url);

        if (cachedEntry) {
            return cachedEntry;
        }
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.statusText}`);
        }

        const locations = await response.json();
        this.cache.add(url, locations);
        
        return locations;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(`PokeAPI.baseURL/location-area/${locationName}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch location area '${locationName}' : ${response.statusText}`);
        }
        return response.json();
    }
}
    


export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};