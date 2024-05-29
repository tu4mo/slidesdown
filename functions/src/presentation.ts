import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const presentation = async (
  req: functions.Request,
  res: functions.Response,
  db: admin.firestore.Firestore,
) => {
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
