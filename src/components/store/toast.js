import { writable } from 'svelte/store'

const toasts = writable([])


// have an actions div that only renders if actions.length > 0
actions: [
    {
        url: 'http://www.rankingengine.pubmeeple.com',
        name: 'Ranking Engine'
    },
    {
        func: toasts.removeToast,
        parameters: [1], // array of parameters
        name: 'Remove'
    }
]

let toastId = 0;
const customStore = {
    subscribe: toasts.subscribe,
    pushToast: ({msg = '', perpetual = false, actions = [], retainMs = 3000, closeText = 'Close', closable = false}) => {
        toasts.update((toasts) => {
            const anyPerpetual = toasts.some((toast) => toast.perpetual)
            let newToasts
            if (anyPerpetual) {
                newToasts = [{
                _id: ++toastId,
                msg,
                perpetual,
                actions,
                closeText,
                closable
                }, ...toasts]
            } else {
                newToasts = [...toasts, {
                _id: ++toastId,
                msg,
                perpetual,
                actions,
                closeText,
                closable
                }];
            }
    
            setTimeout(() => {
                customStore.removeToast();
            }, retainMs)

            return newToasts

        })

    },
    removeToast: (id) => {
        toasts.update((toasts) => {
            if (id) {
                return toasts.filter((toast) => toast._id !== id)
            } else {
                return toasts.filter((toast, i) => i > 0 || toast.perpetual); 
            }
        })
    },
    removeAllToasts: () => {
        toasts.set([])
    }
}

export default customStore