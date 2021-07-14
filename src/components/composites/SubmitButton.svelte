<script>
    import HelpItem from '../ui/HelpItem.svelte'
    import Button from '../ui/Button.svelte'

    import user from '../store/user'
    import { helpTextStore } from '../store/help'
    import apData from '../store/data'
    import modal from '../store/modal'
	import loading from '../store/loading'
	import { post } from '../../utils/http'
	import toasts from '../store/toast'

    $: disabled = $apData.length === 0 ? true : false

    const handleClickSubmit = () => { 

		const confirmFunc = async () => {
            modal.hide()
			loading.show()

			const userInfo = {
				displayName: $user.displayName,
				userName: $user.name
			}
			
			// const result = await post('/action/submit', userInfo)
			const result = {ok: true}

			if (result.ok) {
				toasts.pushToast({msg: 'Your selections have been submitted'})
				// This re-syncs the data in the app with the database.
                // const request = await post('/action/get-data', {userName: userInfo.userName})
		        // apData.setApData(request.recordset)
				loading.hide()
			} else {
				toasts.pushToast({msg: 'You selections could not be submitted at this time. Please try again later or notify AP@company.com'})
				loading.hide()
			}
		}
		
		const options = {
			title: 'Hold Up!',
			message: 'You are about to submit your selections to AP. Do you want to continue?',
			backgroundClose: false,
			func: confirmFunc
		}

        modal.show(options)
    }
</script>

<style>
    /* your styles go here */
</style>

<HelpItem helpText={$helpTextStore.submit} placement="left">
    <Button text="Submit to AP" on:clicked={handleClickSubmit} disabled={disabled} />
</HelpItem>