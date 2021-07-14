<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();

    export let text = "Placeholder"
    export let disabled = false
    export let linkref = null
</script>

<style>
    button {
        text-decoration: none;
        color: #fff;
        background-color: var(--prime);
        text-align: center;
        letter-spacing: .5px;
        -webkit-transition: all .2s ease-out;
        transition: all .2s ease-out;
        cursor: pointer;
        font-size: 1.4rem;
        outline: 0;
        height: 36px;
        line-height: 36px;
        padding: 0 16px;
        border: none;
        border-radius: 2px;
        transition: all .2s;
        display: flex;
        align-items: center;
        margin: 1rem;
    }

    button:disabled {
        background-color: var(--second);
    }

    button:hover {
        background-color: var(--flash);
        transform: translateY(-2px);
        -webkit-box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
        box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
    }

    button:active {
        background-color: var(--flash);
        transform: translateY(1px);
        /* -webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,0.089), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.089), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2); */
        box-shadow: none;
    }

    button:active:disabled,
    button:hover:disabled {
        background-color: var(--second);
    }

    a {
        text-decoration: none;
    }
</style>

{#if linkref}
<a href="{linkref}" target="_blank">
    <button type="button"  disabled={disabled}>
        <span>{text}</span>
    </button>
</a>
{:else}
    <button on:click={() => dispatch('clicked')} disabled={disabled}>
        <span>{text}</span>
    </button>
{/if}

