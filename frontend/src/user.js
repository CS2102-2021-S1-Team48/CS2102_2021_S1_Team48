import {writable} from 'svelte/store'

export const account = writable(
    "Petownername");

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