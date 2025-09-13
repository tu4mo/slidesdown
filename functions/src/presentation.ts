import { Firestore } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions/v1'

export async function presentation(
  req: functions.Request,
  res: functions.Response,
  db: Firestore,
) {
  const { id } = req.query

  try {
    const querySnapshot = await db
      .collection('slides')
      .where('presentationId', '==', id)
      .limit(1)
      .get()

    const firstDocument = querySnapshot.docs[0]

    await db
      .collection('slides')
      .doc(firstDocument.id)
      .update({ visitedAt: new Date() })

    console.log(`${firstDocument.id}: visitedAt updated`)

    res.send(firstDocument.data())
  } catch (err) {
    console.error(err)

    res.sendStatus(404)
  }
}
