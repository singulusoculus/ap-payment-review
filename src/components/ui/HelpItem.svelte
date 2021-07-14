<script>
    import { showHelp } from '../store/help.js'
    import { fade, fly } from 'svelte/transition'

    
    export let helpText = 'Placeholder text'
    export let placement = 'bottom'

    let showHelpText = false

    const toggleText = () => {
        if ($showHelp) {
            showHelpText = !showHelpText
        }
    }
</script>

<style>
    .help-wrapper {
        position: relative;
    }

    .overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,0, 0.40);
        z-index: 5;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .3s;
        border-radius: 2px;
        cursor: pointer;
    }

    .overlay:hover {
        background-color: rgba(255,255,0, 0.65);
        border: 1px solid black;
    }

    .help-text {
        position: absolute;
        margin-top: 1rem;
        background-color: #323232;
        color: #fff;
        border-radius: 5px;
        padding: .5rem .8rem;
        z-index: 30;
        width: 18rem;
        font-size: 1.2rem;
        z-index: 100;
        font-weight: normal;
    }

    .help-text::before {
        width: 1rem;
        height: 1rem;
        background-color: #323232;
        content: "";
        position: absolute;
        border-radius: 2px;
        transform: rotate(45deg);
    }

    .help-text-bottom {
        left: 42%;
        transform: translateX(-42%);
    }

    .help-text-bottom::before {
        left: 47%;
        top: -.4rem;
    }

    .help-text-right {
        left: 140%;
        transform: translateY(-75%);
    }

    .help-text-right::before {
        top: 42%;
        left: -.4rem;
    }

    .help-text-left {
        right: 107%;
        transform: translateY(-125%);
    }

    .help-text-left::before {
        top: 42%;
        right: -.4rem;
    }



</style>

<div class="help-wrapper">
    <div class="help-item">
        {#if $showHelp}
            <div class="overlay" transition:fade on:mouseenter={toggleText} on:mouseleave={toggleText}></div>
        {/if}
        <slot></slot>
    </div>
    {#if showHelpText}
    <div class=" help-text help-text-{placement}" transition:fly="{{ y: 10, duration: 300 }}">
      {helpText}
    </div>
    {/if}
</div>