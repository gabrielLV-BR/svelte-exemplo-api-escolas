<script lang="ts">
  import type { Cidade, Escola } from "./api/escolas";
  import type { Estado } from "./api/estados";
  import CityPicker from "./lib/CityPicker.svelte";
  import SchoolSearcher from "./lib/SchoolSearcher.svelte";
  import SearchBar from "./lib/SearchBar.svelte";
  import StatePicker from "./lib/StatePicker.svelte";
  import { locationStore, previousPage } from "./stores";

  let estado: Estado = null;
  const setEstado = (e: Estado) => {
    estado = e;
    locationStore.update((l) => {
      return {
        ...l,
        estado: e,
      };
    });
  };

  let cidade: Cidade = null;
  const setCidade = (c: Cidade) => {
    cidade = c;

    locationStore.update((l) => {
      return {
        ...l,
        cidade: c,
      };
    });
  };

  $: search_disabled = !(estado && cidade);

  let nome_da_escola = "";
  const setNomeDaEscola = (n: string) => (nome_da_escola = n);

  let escola: Escola = null;
  const setEscola = (e: Escola) => (escola = e);
</script>

<div class="region previous" on:click={previousPage} on:keydown={previousPage}>
  <div class="arrow" />
</div>

<main>
  <div class="spacing" />

  <div class="middle">
    <div class="pickers">
      <StatePicker {estado} {setEstado} />
      <CityPicker {estado} {cidade} {setCidade} />
    </div>

    <SearchBar
      disabled={search_disabled}
      title="Procurar escola"
      setValue={setNomeDaEscola}
    />
  </div>

  <SchoolSearcher school_name={nome_da_escola} />
</main>

<style lang="scss">
  main {
    position: relative;
  }

  .pickers {
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 1rem;
    margin: 1rem;
  }

  .region {
    cursor: pointer;

    position: fixed;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 5%;
    height: 100vh;

    opacity: 0;

    transition: opacity 200ms;

    &.previous {
      left: 0;
      background-image: linear-gradient(to right, #00000044, #00000000);
    }

    // &.next {
    //   right: 0;
    //   background-image: linear-gradient(to left, #00000044, #00000000);
    // }

    .arrow {
      transform: translateX(-10rem);
    }

    &:hover {
      opacity: 1;
    }

    &:hover .arrow {
      transform: translateX(2rem);
    }
  }

  .arrow {
    width: 1.5em;
    height: 0.3em;

    font-size: 2rem;

    position: relative;
    transition: transform 200ms ease;

    &::before,
    &::after {
      content: "";

      display: block;
      position: absolute;

      background-color: white;
      top: 0;
      left: -0.4em;

      width: 1em;
      height: 0.3em;

      z-index: 1;
    }

    &::before {
      top: -0.25em;
      rotate: -45deg;
    }

    &::after {
      top: 0.25em;
      rotate: 45deg;
    }

    background: white;
  }
</style>
