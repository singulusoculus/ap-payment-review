<script>
    import Tooltip from '../ui/Tooltip.svelte'
    import Icon from '../ui/Icon.svelte'
</script>

<style>
    span:hover :global(svg) {
		color: var(--flash);
		cursor: pointer;
    }
</style>

<Tooltip tip="AP Aging Approval Report">
    <div slot="activator">
        <span>
            <a href="/" target="_blank">
                <Icon name="report" size=25 />
            </a>
        </span>
    </div>
</Tooltip>