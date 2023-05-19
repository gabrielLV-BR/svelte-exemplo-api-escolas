<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { buscaEscolas, type Cidade, type Escola } from "../api/escolas";
  import { locationStore, type Local } from "../stores";
  import SchoolDisplay from "./SchoolListing.svelte";

  export let school_name = "";

  let location: Local;

  locationStore.subscribe((l) => (location = l));

  async function search(name: string) {
    console.log("Searching");

    name = name.trim();

    if (!location.estado) return [];

    const cacheId = {
      location,
      name,
    };

    const cacheKey = JSON.stringify(cacheId);

    const cachedString: string | null = localStorage.getItem(cacheKey);

    if (cachedString != null) {
      console.log("Found in cache");

      const cachedSchools = JSON.parse(cachedString) as Array<Escola>;

      console.log(cachedSchools);

      return cachedSchools;
    }

    const escolas = await buscaEscolas(name, location.estado, location.cidade);

    console.log(escolas);

    localStorage.setItem(cachedString, JSON.stringify(escolas));

    return escolas;
  }
</script>

<section class="content">
  <div class="result-area">
    {#if school_name.trim().length > 0 && location.full()}
      <div class="results" />
    {/if}
  </div>

  {#if school_name.length > 0}
    {#await search(school_name)}
      <div class="awaiting">
        <h1>Carregando escolas...</h1>
      </div>
    {:then escolas}
      <SchoolDisplay {escolas} />
    {:catch error}
      <div class="awaiting">
        <h1>Erro ao encontrar a escola</h1>
      </div>
    {/await}
  {/if}
</section>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;
  }

  .awaiting {
    font-size: 0.5rem;
    font-family: "Courier New", Courier, monospace;
    text-transform: uppercase;
  }
</style>
