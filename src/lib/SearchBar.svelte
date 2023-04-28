<script lang="ts">
    import searchSVG from "../assets/search.svg";

    let nome_escola = "";

    function buscarEscola() {}
</script>

<div class="searchbox">
    <input
        bind:value={nome_escola}
        type="text"
        placeholder="Pesquise pelo nome da escola"
    />

    <button on:click={buscarEscola}>
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

        border-radius: 1.8rem;

        input[type="text"] {
            padding-left: 2rem;
            font-size: 1.2rem;

            background: transparent;

            border: none;
            outline: none;
        }

        button {
            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
        }

        .icon {
            width: 2rem;
            margin: 1rem;

            filter: invert(0.5);
        }
    }
</style>
