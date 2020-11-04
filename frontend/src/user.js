import {writable} from 'svelte/store'

export const account = writable(
    "Petownername");

export const pw = writable(
    "pass");

export const petlist = writable(
    [
        "Husky",
    "Corgi",
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