<script lang="ts">
    import {
        getEstados,
        getImagemBandeiraURL,
        type Estado,
    } from "../api/estados";

    import { locationStore, nextPage, pageIndexStore } from "../stores";

    function selectState(estado: Estado) {
        locationStore.update((state) => {
            return { ...state, estado };
        });

        nextPage();
    }
</script>

<h1>Qual seu estado?</h1>

<section class="states_container">
    {#await getEstados()}
        <p>Carregando...</p>
    {:then estados}
        {#each estados as estado}
            <button class="state" on:click={() => selectState(estado)}>
                <img
                    src={getImagemBandeiraURL(estado.sigla)}
                    alt="Bandeira do {estado.nome}"
                />
                <p>{estado.nome}</p>
            </button>
        {/each}
    {:catch error}
        <h2>Erro ao carregar. Tente novamente.</h2>
    {/await}
</section>

<style lang="scss">
    section.states_container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        gap: 1rem;
    }

    .state {
        min-width: 15rem;
        width: 15rem;
        max-width: 15rem;

        flex: 1;

        background: #303030;
        border-radius: 1rem;

        overflow: hidden;

        box-shadow: 0 0 5px 5px #202020;

        img {
            width: 100%;
            height: auto;
        }
    }
</style>
