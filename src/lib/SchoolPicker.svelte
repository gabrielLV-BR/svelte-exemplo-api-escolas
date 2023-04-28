<script lang="ts">
    import { locationStore } from "../stores";
    import SearchBar from "./SearchBar.svelte";
</script>

<main>
    <section class="search">
        <h1>Pesquisa de escola</h1>
        <SearchBar />
    </section>

    <section class="listing" />
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        min-width: 50rem;
        min-height: 20rem;

        margin: 3rem;

        background-color: #202020;
        padding: 2rem;
        border-radius: 0.3rem;

        gap: 0.2rem;

        & > * {
            margin: 0;
        }
    }

    .search {
        width: 100;

        h1 {
            font-size: 1.8rem;
        }
    }
</style>
