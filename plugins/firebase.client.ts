import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


export default defineNuxtPlugin(async () => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: config.public.apiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.messagingSenderId,
        appId: config.public.appId
    }

    const app = initializeApp(firebaseConfig)

    const firebaseStorage = getStorage(app);

    return {
        provide: {
            storage: firebaseStorage
        }
    }
})