<script lang="ts">
  import CityPicker from "./lib/CityPicker.svelte";
  import SchoolPicker from "./lib/SchoolPicker.svelte";
  import StatePicker from "./lib/StatePicker.svelte";
  import { nextPage, pageIndexStore, previousPage } from "./stores";

  const components = [StatePicker, CityPicker, SchoolPicker];

  let index = 0;

  $: component = components[index];

  pageIndexStore.subscribe((newIndex) => {
    if (newIndex < 0) newIndex = 0;
    if (newIndex > components.length) newIndex = components.length;

    index = newIndex;
  });
</script>

<div class="region previous" on:click={previousPage} on:keydown={previousPage}>
  <div class="arrow" />
</div>

<svelte:component this={component} />

<!-- <div class="region next" on:click={nextPage} on:keydown={nextPage}>
  <div class="arrow" />
</div> -->

<style lang="scss">
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
