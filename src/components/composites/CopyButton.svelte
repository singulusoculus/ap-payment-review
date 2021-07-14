<script>
    import Tooltip from '../ui/Tooltip.svelte'
    import Icon from '../ui/Icon.svelte'
    import toasts  from '../store/toast'

    export let selector

    const handleCopyClick = () => {
 
        const el = document.querySelector(selector)
        const body = document.body
        let range 
        let sel
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
        document.execCommand("Copy");

        // Deselect
        if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
        } else if (document.selection) {  // IE?
            document.selection.empty();
        }

        toasts.pushToast({msg: 'The table has been copied'})

    }
</script>

<style>
    span:hover :global(svg) {
		color: var(--flash);
		cursor: pointer;
    }
</style>

<Tooltip tip="Copy to Clipboard">
    <div slot="activator">
        <span>
            <Icon name="copy" size=25 on:clicked="{handleCopyClick}" />
        </span>
    </div>
</Tooltip>