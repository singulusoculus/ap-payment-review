<script>
    export let options = [];
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher();
    let selected




</script>

<style>
    .input-field {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .select-wrapper {
        position: relative;
    }

    select {
        background-color: rgba(255,255,255,0.9);
        width: 100%;
        padding: 5px;
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 4rem;
        font-size: 1.4rem;
    }

    select:focus {
        outline: none;
    }

</style>

    <div class="input-field">
        <div class="select-wrapper">
            <!-- svelte-ignore a11y-no-onchange -->
            <select name="category-select" id="category-select" bind:value={selected} on:change={() => dispatch('changeSelection', selected)}>
                {#each options as option}
                    <option value={option}>{option.name}</option>
                {/each}
            </select>
        </div>
    </div>

