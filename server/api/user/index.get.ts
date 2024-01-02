import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async () => {
  const db = getFirestore()
  const userRef = db.collection('users');

  try {
    const snapshot = await userRef.get();
    const userData = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return userData;
  } catch (error) {
    console.log(`Firebase fetch data => ${error}`)
  }
})
