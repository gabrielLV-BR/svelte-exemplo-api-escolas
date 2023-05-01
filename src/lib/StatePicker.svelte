<script lang="ts">
    import {
        getEstados,
        type Estado,
        getURLBandeira,
        ordenarEstados,
    } from "../api/estados";

    export let estado: Estado = null;
    export let setEstado: (e: Estado) => void = () => {};

    let estados: Estado[] = [];
    let open: boolean = false;

    const toggleOpen = () => (open = !open);

    getEstados()
        .then((e) => (estados = e.sort(ordenarEstados)))
        .catch(() => alert("Erro ao carregar os estados"));
</script>

<div class="picker" class:open>
    <button class="header" on:click={toggleOpen}>
        Escolha seu estado

        {#if estado}
            <span class="selected">
                - {estado.nome}
            </span>
        {/if}
    </button>

    <div class="pick-area">
        <div class="options">
            {#each estados as estado}
                <button class="option" on:click={() => setEstado(estado)}>
                    <img
                        src={getURLBandeira(estado.sigla)}
                        alt="Bandeira de {estado.nome}"
                    />
                    <span>
                        {estado.nome}
                    </span>
                </button>
            {:else}
                <p>Carregando</p>
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

        z-index: 1;

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
