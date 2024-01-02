import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  const db = getFirestore()
  const uid = getRouterParam(event, 'uid')
  const body = await readBody(event)
  const userRef = db.collection('users').doc(`${uid}`);
  await userRef.update(body);

  return 'Updated';
})