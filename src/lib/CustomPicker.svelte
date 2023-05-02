<script lang="ts">
    import expandSVG from "../assets/expand.svg";

    type T = $$Generic;

    type ImageReturn = {
        src: string;
        alt: string;
    };

    export let value: null | T = null;
    export let setValue: (v: T) => void;

    export let possible_values: T[] = [];
    export let title: string = "";
    export let getValueTitle: null | ((v: T) => string) = null;
    export let getImageFromValue: null | ((v: T) => ImageReturn) = null;

    let open: boolean = false;

    const toggleOpen = () => (open = !open);
</script>

<div class="picker" class:open>
    <button class="header" on:click={toggleOpen}>
        <span class="text">
            {title}

            {#if value && getValueTitle}
                <span class="selected">
                    - {getValueTitle(value)}
                </span>
            {/if}
        </span>
        <span class="icon">
            <img draggable="false" src={expandSVG} alt="" />
        </span>
    </button>

    <div class="pick-area">
        <div class="options">
            {#each possible_values as possibility}
                <button class="option" on:click={() => setValue(possibility)}>
                    {#if getImageFromValue != null}
                        <img
                            draggable="false"
                            alt=""
                            {...getImageFromValue(possibility)}
                        />
                    {/if}
                    <span>
                        {getValueTitle(possibility)}
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
    .pick-area .options,
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
    }

    .picker {
        background-color: #121212;
        border-radius: 0.5rem;

        width: 100%;
        min-width: 20rem;

        position: relative;

        .header {
            flex-direction: row;
            justify-content: space-between;

            .text {
                width: fit-content;
                font-size: 1.2rem;
                text-align: left;
            }

            .icon img {
                width: 2rem;
                filter: invert(1);

                transition: transform 200ms ease;
            }

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

        overflow: hidden scroll;
    }

    .open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .pick-area {
            height: 15rem;
        }

        .icon img {
            transform: rotate(180deg);
        }
    }
</style>
