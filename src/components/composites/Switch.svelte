<script>
    // import { createEventDispatcher } from 'svelte'
    import { post } from '../../utils/http'
    import apData from '../store/data'
    import HelpItem from '../ui/HelpItem.svelte'
    import { helpTextStore } from '../store/help'

    export let title = null
    export let key
    export let active

    const handleSwitchChange = async () => {
		// Make database call to change status field. Send what you want to change it too - the opposite of what it currently is.
		const data = {keyFld: key, status: active ? 'Hold' : 'Active'}

		// const request = await post('/action/change-status', data)

        console.log(data);

		let newStatus = active ? 'Active' : 'Hold'
        // request[0].apdocstat

		apData.setStatusFlag(key, newStatus)
	}
</script>

<style>
    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: flex;
    width: 28px;
    height: 12px;
    margin: 0 auto;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #9E9E9E;
    -webkit-transition: .2s;
    transition: .2s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: -3px;
    bottom: -3px;
    background-color: #ccc;
    -webkit-transition: .2s;
    transition: .2s;
        -webkit-box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }

    input:checked + .slider:before {
        background-color: #527a45;
    }

    input:checked + .slider {
    background-color: #869b7f;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #869b7f;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }

    .switch-title {
        text-align: center;
        margin: 1rem 0;
        font-size: 1.6rem;
    }

</style>

<HelpItem placement='right' helpText={$helpTextStore.switch}>
<article>
    {#if title}
    <p class="switch-title">{title}</p>
    {/if}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="switch">
            <div>
                <input type="checkbox" bind:checked={active} on:change="{handleSwitchChange}">
                <span class="slider round" title={active ? "Active" : "Hold"}></span>
            </div>
    </label>
</article>
</HelpItem>