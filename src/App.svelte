<script lang="ts">
  import type { Cidade, Escola } from "./api/escolas";
  import type { Estado } from "./api/estados";
  import CityPicker from "./lib/CityPicker.svelte";
  import CustomPicker from "./lib/CustomPicker.svelte";
  import SchoolPicker from "./lib/SchoolPicker.svelte";
  import SearchBar from "./lib/SearchBar.svelte";
  import StatePicker from "./lib/StatePicker.svelte";
  import { previousPage } from "./stores";

  // const components = [StatePicker, CityPicker, SchoolPicker];

  // let index = 0;

  // $: component = components[index];

  // pageIndexStore.subscribe((newIndex) => {
  //   if (newIndex < 0) newIndex = 0;
  //   if (newIndex > components.length) newIndex = components.length;

  //   index = newIndex;
  // });

  let estado: Estado = null;
  const setEstado = (e: Estado) => (estado = e);

  let cidade: Cidade = null;
  const setCidade = (c: Cidade) => (cidade = c);

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
  <div class="pickers">
    <StatePicker {estado} {setEstado} />
    <CityPicker {estado} {cidade} {setCidade} />
  </div>

  <SearchBar
    disabled={search_disabled}
    title="Procurar escola"
    setValue={setNomeDaEscola}
  />

  <p>O nome da escola é {nome_da_escola}</p>
  <!-- {#if estado && cidade}
  {/if} -->
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

  .pickers.ghost {
    opacity: 0.5;
    position: relative;
    top: -3.6rem;
    left: 0;

    z-index: 2;
  }

  .ghost-element {
    width: 100%;
    min-width: 20rem;
    height: 3.6rem;

    background-color: red;

    z-index: -1;
  }

  .pickers.all-picked {
    flex-direction: row;
    height: fit-content;
    gap: 1rem;
    padding: 0.5rem;

    max-width: 100%;

    position: fixed;
    left: 0;
    top: 0;
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
