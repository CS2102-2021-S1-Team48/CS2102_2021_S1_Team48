import {writable} from 'svelte/store'

export const account = writable(
    "");

export const acctype = writable("");

export const pw = writable(
    "pass");

export const petlist = writable(
    [
        "Husky",
    "Dog",
    "Dinosaur",
    "Duck",
    "Swine",
    "Dragon",
    "Ant",
    ]
)
export const pricelist = writable (
    ["Hello"]
    )