<script lang="ts">
  import { buscaEscolas, type Cidade, type Escola } from "../api/escolas";
  import type { Estado } from "../api/estados";
  import { locationStore, type Local } from "../stores";

  export let school_name = "";

  let location: Local;
  let escolas: Escola[];

  locationStore.subscribe((l) => (location = l));

  async function search(name: string) {
    console.log("Searching");

    name = name.trim();

    console.log(escolas);
    console.log(location);

    if (location.estado) {
      const escs = await buscaEscolas(name, location.estado, location.cidade);

      console.log(escs);
    }
  }

  $: search(school_name);
</script>

<p>{school_name}</p>
<div class="result-area">
  {#if school_name.trim().length > 0 && location.full()}
    <div class="results" />
  {/if}
</div>

<style lang="scss">
</style>
