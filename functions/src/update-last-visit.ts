import { Firestore } from 'firebase-admin/firestore'
import * as functions from 'firebase-functions/v1'

export async function updateLastVisit(
  req: functions.Request,
  res: functions.Response,
  db: Firestore,
) {
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
