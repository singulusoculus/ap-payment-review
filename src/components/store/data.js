import { writable } from 'svelte/store'

const store = writable([])

const customStore = {
    subscribe: store.subscribe,
    setApData: (apData) => {
        store.set(apData)
    },
    flipStatusFlag: (key, isChecked) => {
        store.update( (items) => {
            const index = items.findIndex(i => i.item === key)
            const itemToUpdate = items[index]
            if (isChecked === false) {
                itemToUpdate.status = 'Hold'
            } else {
                itemToUpdate.status = 'Active'
            }
            const updatedItems = [ ...items ]
            updatedItems[index] = itemToUpdate
            
            return updatedItems
        })
    },
    setStatusFlag: (key, status) => {
        store.update((items) => {
            const index = items.findIndex(i => i.item === key)
            const itemToUpdate = items[index]
            itemToUpdate.status = status
            status === 'Active' ? itemToUpdate.active = 1 : itemToUpdate.active = 0

            const updatedItems = [ ...items ]
            updatedItems[index] = itemToUpdate
            
            return updatedItems
        })
    },
    sortApData: (label, dir) => {
        store.update(items => {
            if (dir === 'asc') {
                items = items.sort((a,b) => a[label]>b[label] ? 1:-1)
                return items
            } else if (dir === 'desc') {
                items = items.sort((a,b) => a[label]<b[label] ? 1:-1)
                return items
            }
        })
    }
}

export default customStore

