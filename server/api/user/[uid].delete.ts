import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
  const db = getFirestore()
  const uid = getRouterParam(event, 'uid')

  const userRef = db.collection('users').doc(`${uid}`);
  await userRef.delete();

  return 'ลบขัอมูลสำเร็จ';
})