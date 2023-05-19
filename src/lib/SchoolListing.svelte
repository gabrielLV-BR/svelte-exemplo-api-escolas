<script lang="ts">
  import type { Escola } from "../api/escolas";
  import SchoolDisplay from "./SchoolDisplay.svelte";

  import expandImg from "../assets/expand.svg";

  export let escolas: Array<Escola>;

  let escola_escolhida: Escola | null;

  let displaying = false;

  const pick = (e: Escola) => {
    displaying = true;
    escola_escolhida = e;
  };
  const clearPick = () => {
    displaying = false;
  };
</script>

<div class="roulette">
  <div class="content" class:displaying>
    <div class="listing">
      <ul>
        {#each escolas as escola}
          <li on:click={() => pick(escola)} on:keydown={() => pick(escola)}>
            <h1>{escola.nome}</h1>
            <img src={expandImg} alt="Expandir escola" />
          </li>
        {:else}
          <li class="empty">
            <p class="empty">Nenhuma escola encontrada</p>
          </li>
        {/each}
      </ul>
    </div>
    <div class="display">
      {#if escola_escolhida != null}
        <SchoolDisplay escola={escola_escolhida} voltar={clearPick} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .roulette {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: #303030;

    width: 70rem;
    max-width: 90vw;

    height: 40rem;

    overflow: hidden;

    border-radius: 1rem;
  }

  .content {
    width: 200%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > * {
      width: 70rem;
    }

    transition: transform 200ms;

    transform: translateX(25%);

    &.displaying {
      transform: translateX(-25%);
    }
  }

  .roulette {
    overflow: hidden;

    transition: transform 200ms;
  }

  .listing {
    max-height: 40rem;
    overflow: auto;

    ul li {
      display: flex;
    }
  }

  .listing ul {
    padding: 0;

    list-style: none;

    font-size: 0.6rem;

    text-align: left;

    li {
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

  .listing ul li.empty {
    font-size: 1.5rem;
  }
</style>
