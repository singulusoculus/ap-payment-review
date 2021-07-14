import { writable } from 'svelte/store'

const modalStore = writable({
    show: false,
    options: {}
})

const modal = {
    subscribe: modalStore.subscribe,
    show: (options) => {
        modalStore.set({show: true, options})
    },
    hide: () => {
        modalStore.set({show: false, options: {}})
    }
}

export default modal