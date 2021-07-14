import { writable } from 'svelte/store'

const userStore = writable({})

const user = {
    subscribe: userStore.subscribe,
    set: (userInfo) => {
        userStore.set(userInfo)
    }
}

export default user