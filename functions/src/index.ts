import * as functions from 'firebase-functions/v1'
import { onSchedule } from 'firebase-functions/scheduler'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

import { presentation } from './presentation.js'
import { removeOldSlides } from './remove-old-slides.js'

initializeApp()

const db = getFirestore()

export const onPresentationRequest = functions.https.onRequest((req, res) =>
  presentation(req, res, db),
)

export const scheduleRemoveOldSlides = onSchedule('0 0 * * 0', () =>
  removeOldSlides(db),
)
