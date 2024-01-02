
import { initializeApp, getApp, cert } from 'firebase-admin/app';

// const seviceAccount = useRuntimeConfig().keyService

const createFirebaseApp = () => {
    const config = useRuntimeConfig()

    try {
        return getApp()
    } catch {
        return initializeApp({
            credential: cert(config.keyFirebaseAdmin)
        })
    }
}

export default defineNuxtPlugin(() => {
    createFirebaseApp()
})


