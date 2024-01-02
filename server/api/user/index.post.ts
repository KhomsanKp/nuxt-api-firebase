import { getFirestore } from 'firebase-admin/firestore';

export default defineEventHandler(async (event) => {
    const db = getFirestore()
    const body = await readBody(event)

    const docRef = db.collection('users');
    const resAddData = await docRef.add(body);

    console.log(resAddData.id)
    return 'เพิ่มรายการสำเร็จ';
})
