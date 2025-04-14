import * as functions from 'firebase-functions/v1'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

import { presentation } from './presentation.js'
import { removeOldSlides } from './remove-old-slides.js'
import { updateLastVisit } from './update-last-visit.js'

initializeApp()

const db = getFirestore()

export const onPresentationRequest = functions.https.onRequest((req, res) =>
  presentation(req, res, db),
)

export const onSlideCreate = functions.firestore
  .document('slides/{slideId}')
  .onCreate(() => removeOldSlides(db))

export const onRequest = functions.https.onRequest((req, res) =>
  updateLastVisit(req, res, db),
)
