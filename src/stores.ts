import { writable } from "svelte/store";
import type { Estado } from "./api/estados";
import type { Cidade, Escola } from "./api/escolas";
import type StatePicker from "./lib/StatePicker.svelte";

export type Local = {
    cidade?: Cidade,
    estado?: Estado,
    escola?: Escola
}

export const pageIndexStore = writable<number>(0);
export const locationStore = writable<Local>({
    cidade: null,
    estado: null,
});

export function nextPage() {
    pageIndexStore.update(i => i + 1);
}

export function previousPage() {
    pageIndexStore.update(i => i - 1);
}