<script>
    import HelpItem from '../ui/HelpItem.svelte'
    import Select from '../ui/Select.svelte'
    import { helpTextStore } from '../store/help'

        const selectOptions = [
		{
			value: 0,
			name: 'Need to Review',
			selected: true
		},
		{
			value: 1,
			name: 'Previously Approved'
		}
	]
</script>

<style>
    /* your styles go here */
</style>

<div>
    <HelpItem helpText={$helpTextStore.view}>
        <Select options={selectOptions} on:changeSelection />
    </HelpItem>
</div>