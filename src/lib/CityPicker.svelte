<script lang="ts">
    import { getCidadesDeEstado, type Cidade } from "../api/escolas";
    import type { Estado } from "../api/estados";

    export let estado: Estado = null;

    export let cidade: Cidade = null;
    export let setCidade: (e: Cidade) => void = () => {};

    let cidades: Cidade[] = [];
    let open: boolean = false;

    const toggleOpen = () => (open = !open);

    $: getCidadesDeEstado(estado).then((c) => (cidades = c));
</script>

<div class="picker" class:open>
    <button class="header" on:click={toggleOpen}>
        Escolha sua cidade

        {#if estado}
            <span class="selected">
                - {estado.nome}
            </span>
        {/if}
    </button>

    <div class="pick-area">
        <div class="options">
            {#each cidades as cidade}
                <button class="option" on:click={() => setCidade(cidade)}>
                    {cidade.nome}
                </button>
            {:else}
                <h2>Carregando</h2>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .picker,
    .pick-area .options {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
    }

    .picker {
        background-color: #121212;
        border-radius: 0.5rem;

        position: relative;

        .header {
            font-size: 1.2rem;

            width: 100%;

            text-align: left;

            background-color: transparent;
            align-self: flex-start;
        }

        .header .selected {
            font-style: italic;
            color: #898989;
        }

        .option {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 2rem;
            width: 100%;
            border-radius: none;
        }

        .option img {
            height: 1rem;
            width: auto;
        }
    }

    .pick-area {
        position: absolute;
        left: 0;
        top: 100%;

        width: 100%;

        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;

        background-color: #090909;

        .option {
            border-radius: 0;
        }

        transition: height 200ms ease;
        height: 0;
        margin: 0;

        overflow: scroll;
    }

    .open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .pick-area {
            height: 15rem;
        }
    }
</style>
