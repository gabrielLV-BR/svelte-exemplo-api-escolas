<script lang="ts">
  import expandImg from "../assets/expand.svg";
  import type { Escola } from "../api/escolas";

  export let escolas: Array<Escola>;
  export let escolherEscola: (e: Escola) => void;
</script>

<ul class="listing">
  {#each escolas as escola}
    <li
      on:click={() => escolherEscola(escola)}
      on:keydown={() => escolherEscola(escola)}
    >
      <h1>{escola.nome}</h1>
      <img src={expandImg} alt="Expandir escola" />
    </li>
  {:else}
    <li class="empty">
      <p class="empty">Nenhuma escola encontrada</p>
    </li>
  {/each}
</ul>

<style lang="scss">
  .listing {
    font-size: 0.6rem;
    text-align: left;

    list-style: none;

    padding: 0;

    display: flex;
    flex-direction: column;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      padding: 0.5rem;
      transition: background-color 200ms;

      font-size: 0.4rem;

      cursor: pointer;
    }

    li img {
      filter: invert(1);
      rotate: -90deg;
      opacity: 0;

      transition: transform 200ms, opacity 100ms;
    }

    li:hover img {
      opacity: 1;
      transform: translateY(10px);
    }

    li:hover {
      background-color: #ffffff20;
    }

    li * {
      text-overflow: ellipsis;
    }
  }
</style>
