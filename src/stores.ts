import { writable } from "svelte/store";
import type { Estado } from "./api/estados";
import type { Cidade } from "./api/escolas";

export type Local = {
  cidade?: Cidade;
  estado?: Estado;

  full: () => boolean;
};

export const pageIndexStore = writable<number>(0);
export const locationStore = writable<Local>({
  cidade: null,
  estado: null,

  full: function () {
    return this.estado && this.cidade;
  },
});

export function nextPage() {
  pageIndexStore.update((i) => i + 1);
}

export function previousPage() {
  pageIndexStore.update((i) => i - 1);
}
