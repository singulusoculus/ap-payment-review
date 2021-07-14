import { writable } from 'svelte/store'

const loadingStore = writable(false)

const loading = {
    subscribe: loadingStore.subscribe,
    show: () => {
        loadingStore.set(true)
    },
    hide: () => {
        loadingStore.set(false)
    }
}

export default loading