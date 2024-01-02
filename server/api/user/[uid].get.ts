import { getFirestore } from 'firebase-admin/firestore';


export default defineEventHandler(async (event) => {
    const db = getFirestore()
    const uid = getRouterParam(event, 'uid')
    const userRef = db.collection('users').doc(`${uid}`);
    const datSnap = await userRef.get();

    if (!datSnap.exists) {
        return 'No document.'
    } else {
        return datSnap.data()
    }
})