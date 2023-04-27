<script lang="ts">
    import type { Estado } from "../api/estados";

    import { getCidadesDeEstado, type Cidade } from "../api/escolas";
    import { locationStore, nextPage, type Local } from "../stores";

    let estado: Estado = null;
    let cidade: Cidade = null;

    let cidades: Cidade[] = [];

    locationStore.subscribe(async (value: Local) => {
        if (!value) return;

        const { estado: novoEstado } = value;

        estado = novoEstado;
        cidades = await getCidadesDeEstado(novoEstado);
    });

    function clearEstado() {
        locationStore.set({
            estado: null,
            cidade: null,
        });
    }

    function next() {
        locationStore.set({
            estado,
            cidade,
        });

        nextPage();
    }
</script>

<section>
    <main>
        <p>Estado de {estado.nome} selecionado.</p>

        <p>Selecione sua cidade</p>

        {#if cidades.length == 0}
            <p class="loading">Carregando...</p>
        {:else}
            <select bind:value={cidade} name="cidade" id="cidade">
                {#each cidades as cidade}
                    <option value={cidade}>{cidade.nome}</option>
                {/each}
            </select>
        {/if}

        <hr />
        <button disabled={cidade == null} class="next" on:click={next}>
            Próximo
            <div class="arrow" />
        </button>
    </main>
    <footer>
        <a href="_" on:click|preventDefault={clearEstado}>
            Escolher outro estado
        </a>
    </footer>
</section>

<style lang="scss">
    main {
        background-color: #343434;
        border-radius: 0.2rem;

        width: 80%;
        height: 80%;
        padding: 10rem;

        box-shadow: 0 0 5px 5px #00000020;

        gap: 1rem;

        hr {
            width: 100%;
        }

        * {
            margin: 0;
        }
    }

    main,
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
    }

    section {
        gap: 2rem;
    }

    .loading {
        color: #202020;
    }

    .next {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;

        background-color: #22aacc;

        &:disabled {
            color: #333333;
            background-color: #808080;
        }

        &:not(:disabled):hover {
            background-color: #55ccff;

            .arrow {
                transform: translateX(5px);
            }
        }
    }

    .arrow {
        width: 20px;
        height: 3px;
        position: relative;

        transition: transform 200ms ease;

        &::before,
        &::after {
            content: "";

            display: block;
            position: absolute;

            background-color: white;
            top: 0;
            right: -1px;

            width: 10px;
            height: 3px;

            z-index: 1;
        }

        &::before {
            top: -3px;
            rotate: 45deg;
        }

        &::after {
            top: 3px;
            rotate: -45deg;
        }

        background: white;
    }
</style>
