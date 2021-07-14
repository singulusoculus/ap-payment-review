import { writable, readable } from 'svelte/store'

const showHelpStore = writable(false)

const showHelp = {
    subscribe: showHelpStore.subscribe,
    toggleHelp: () => {
        showHelpStore.update((showHelp) => {
            return !showHelp
        })
    }
}

const helpTextStore = readable({
    view: "Need to Review is the default. You can change to Previously Approved to see items you have approved but have not been paid.",
    filter: "Type here to search for projects, invoices, or vendors.",
    submit: "Click to notify AP when you have completed your review.",
    switch: 'Use these switches to toggle items between Active and Hold. Green is Active. Grey is Hold',
    sort: 'You can sort the grid by clicking on these columns.'
})

export { showHelp, helpTextStore }