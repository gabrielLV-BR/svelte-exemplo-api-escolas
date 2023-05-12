<script lang="ts">
  import searchSVG from "../assets/search.svg";

  export let title: string = "Pesquise";
  export let setValue: (v: string) => void = () => {};
  export let disabled = false;

  let value = "";

  $: setValue(value);
</script>

<div class="searchbox" class:disabled>
  <input bind:value type="text" placeholder={title} {disabled} />

  <button {disabled}>
    <img class="icon" src={searchSVG} alt="" draggable="false" />
  </button>
</div>

<style lang="scss">
  .searchbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background: #343434;

    height: 1.5rem;
    border-radius: 2rem;

    padding: 1rem;

    input[type="text"] {
      font-size: 1.2rem;

      background: transparent;

      border: none;
      outline: none;
    }

    &.disabled {
      filter: brightness(0.8);
    }

    button {
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
    }

    button:disabled {
      cursor: inherit;
    }

    .icon {
      height: 2rem;
      filter: invert(0.5);
    }
  }
</style>
