<script>
    export let search = ''
    import Icon from '../ui/Icon.svelte'
    import HelpItem from '../ui/HelpItem.svelte'
    import { helpTextStore } from '../store/help'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher();
</script>

<style>
    .input-field {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .search-wrapper {
        background-color: rgba(255,255,255,0.9);
        width: 100%;
        padding: 5px 8px;
        border: 1px solid #c1c1c1;
        border-radius: 5px;
        height: 4rem;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
    }

    input {
        outline: none;
        border: none;
        font-size: 1.6rem;
    }
</style>

<div class="input-field">
    <HelpItem helpText={$helpTextStore.filter}>
    <div class="search-wrapper">
            <input type="search" bind:value="{search}" on:input={() => dispatch('searchText', search)} placeholder="Search...">
            <Icon name="search" size=18 />
        </div>
    </HelpItem>
</div>