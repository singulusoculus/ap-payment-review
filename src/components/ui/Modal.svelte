<script>
    import Button from './Button.svelte'
    import { fade, fly } from 'svelte/transition'
    import modal from '../store/modal'

    export let title = 'Placeholder title'
    export let message = 'Placeholder message'
    export let func = false
    export let backgroundClose = false

    function closeModal() {
        modal.hide()
    }

</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 110;
    }

    .modal {
        position: fixed;
        top: 10vh;
        left: 10%;
        width: 80%;
        max-height: 80vh;
        background: white;
        border-radius: 5px;
        z-index: 200;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        /* overflow: scroll; */
    }

    h3 {
        padding: 1.5rem;
        margin: 0;
        border-bottom: 1px solid #ccc;
        font-family: 'Roboto Slab', sans-serif;
    }

    .content {
        padding: 1.5rem;
        font-size: 1.6rem;
    }

    footer {
        display: flex;
        justify-content: center;
        padding: 1.5rem;
    }

    @media (min-width: 768px) {
        .modal {
            width: 50rem;
            left: calc(50% - 20rem);
        }
    }

</style>

{#if $modal.show}

{#if !backgroundClose}
    <div class="modal-backdrop" transition:fade={{duration: 300}}></div>
{:else}
    <div class="modal-backdrop" on:click={closeModal} transition:fade={{duration: 300}}></div>
{/if}

<div class="modal" transition:fly={{duration: 500, x: 0, y:-75}}>
    <h3>{title}</h3>
    <div class="content">{message}</div>
    <footer>
        {#if func}
            <Button on:clicked={func} text="Ok" />
            <Button on:clicked={closeModal} text="Cancel" />
        {:else}
            <Button on:clicked={closeModal} text="Ok" />
        {/if}

    </footer>
</div>

{/if}