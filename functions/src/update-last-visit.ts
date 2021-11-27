import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const updateLastVisit = async (
  req: functions.Request,
  res: functions.Response,
  db: admin.firestore.Firestore
) => {
  const { id } = req.query

  if (typeof id !== 'string') {
    return
  }

  try {
    await db.collection('slides').doc(id).update({ visitedAt: new Date() })
    console.log(`${id}: visitedAt updated`)
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${id}: doesn't exist (${err.message})`)
    }
  }

  res.sendStatus(200)
}
