import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'

import { presentation } from './presentation'
import { removeOldSlides } from './remove-old-slides'
import { updateLastVisit } from './update-last-visit'

admin.initializeApp()

const db = admin.firestore()

export const onPresentationRequest = functions.https.onRequest((req, res) =>
  presentation(req, res, db),
)

export const onSlideCreate = functions.firestore
  .document('slides/{slideId}')
  .onCreate(() => removeOldSlides(db))

export const onRequest = functions.https.onRequest((req, res) =>
  updateLastVisit(req, res, db),
)
