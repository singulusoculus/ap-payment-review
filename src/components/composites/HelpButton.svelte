<script>
    import Tooltip from '../ui/Tooltip.svelte'
    import Icon from '../ui/Icon.svelte'
    import { showHelp } from '../store/help'
	import toasts from '../store/toast'

    const handleClickHelp = () => {
		showHelp.toggleHelp()
		if ($showHelp) {
			window.scrollTo(0,0)
			const toastProps = {
				msg: 'Help mode active. Hover over the highlighted items for information about them. Click the help icon to turn off. If you need further assistance please email support@company.com',
				perpetual: true,
				closable: false
			}

			toasts.pushToast({...toastProps})
		} else {
			toasts.removeAllToasts()
		}
    }
</script>

<style>
    .help-icon-active :global(svg) {
		color: var(--flash);
	}

    span:hover :global(svg) {
		color: var(--flash);
		cursor: pointer;
    }
</style>

<Tooltip tip="Help!">
    <div slot="activator">
        <span on:click={handleClickHelp} class:help-icon-active={$showHelp} >
        <!-- <span on:mouseenter={handleClickHelp} on:mouseleave={handleClickHelp}> -->
            <Icon name="help-circle" size=25 />
        </span>
    </div>
</Tooltip>