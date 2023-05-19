<script lang="ts">
  import { fade, fly, type FlyParams } from "svelte/transition";

  import type { Escola } from "../api/escolas";
  import SchoolDisplay from "./SchoolDisplay.svelte";
  import SchoolListing from "./SchoolListing.svelte";

  export let escolas: Array<Escola>;

  let escola_escolhida: Escola | null;

  let displaying = false;

  const escolherEscola = (e: Escola) => {
    displaying = true;
    escola_escolhida = e;
  };

  const limparEscolha = () => {
    displaying = false;
  };

  const animation: FlyParams & { inverted: () => FlyParams } = {
    x: -500,
    duration: 700,
    opacity: 0,
    inverted() {
      return {
        ...this,
        x: -this.x,
      };
    },
  };
</script>

<div class="roulette">
  {#if !displaying}
    <div class="listing-container" in:fly={animation} out:fly={animation}>
      <SchoolListing {escolas} {escolherEscola} />
    </div>
  {:else}
    <div
      class="display-container"
      in:fly={animation.inverted()}
      out:fly={animation.inverted()}
    >
      {#if escola_escolhida != null}
        <SchoolDisplay escola={escola_escolhida} voltar={limparEscolha} />
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .roulette {
    width: 80vw;
    overflow: hidden;

    background-color: #303030;

    border-radius: 1rem;
  }
</style>
