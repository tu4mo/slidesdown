import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default async (
  req: functions.Request,
  res: functions.Response,
  db: admin.firestore.Firestore
) => {
  const { id } = req.query

  try {
    const querySnapshot = await db
      .collection('slides')
      .where('presentationId', '==', id)
      .limit(1)
      .get()

    const firstDocument = querySnapshot.docs[0]

    db.collection('slides')
      .doc(firstDocument.id)
      .update({ visitedAt: new Date() })

    console.log(`${firstDocument.id}: visitedAt updated`)

    return res.send(firstDocument.data())
  } catch (err) {
    console.error(err)
    return res.sendStatus(404)
  }
}
