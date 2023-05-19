<script lang="ts">
  export let entries: Array<Array<any>>;
</script>

<main class="json">
  <header class="mock">JSON</header>
  <ul class="fields">
    <li class="out">
      <span class="number"> 0 </span>
      <span class="field">
        {"{"}
      </span>
    </li>
    {#each entries as [key, value], index}
      <li>
        <span class="number">
          {index + 1}
        </span>
        <span class="field">
          '{key}' : {value}
        </span>
      </li>
    {/each}
    <li class="out">
      <span class="number">
        {entries.length + 1}
      </span>
      <span class="field">
        {"}"}
      </span>
    </li>
  </ul>
</main>

<style lang="scss">
  .json {
    display: flex;
    flex-direction: column;

    font-family: "Courier New", Courier, monospace;

    position: relative;

    background: #232323;

    border-radius: 0.5rem;
    overflow: hidden auto;

    max-width: 30rem;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding-left: 1rem;

      z-index: 2;

      width: 100%;
      height: 2.25rem;

      background-color: #121212;
    }

    .fields {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      margin: 0;
      padding: 0;

      list-style: none;
      overflow: auto;
    }

    ul li {
      display: grid;
      grid-template-columns: 3rem 1fr;
      grid-template-rows: 1fr;

      gap: 0.5rem;

      place-items: start;

      margin-right: 4rem;
    }

    ul li .field {
      white-space: nowrap;
    }

    ul li:not(.out) .field {
      padding-left: 1.5rem;
    }

    ul li .number {
      width: 2.8rem;
      height: 100%;

      padding: 0.2rem;

      text-align: right;
      background-color: #121212;
    }
  }
</style>
