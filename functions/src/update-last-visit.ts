import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default async (
  req: functions.Request,
  res: functions.Response,
  db: admin.firestore.Firestore
) => {
  const { id } = req.query

  await db
    .collection('slides')
    .doc(id)
    .update({ visitedAt: new Date() })
    .then(() => {
      console.log(`${id}: visitedAt updated`)
    })
    .catch(() => {
      console.error(`${id}: doesn't exist`)
    })
    .then(() => {
      res.sendStatus(200)
    })
}
