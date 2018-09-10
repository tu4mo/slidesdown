const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const presentation = require('./presentation')
const removeOldSlides = require('./removeOldSlides')
const updateLastVisit = require('./updateLastVisit')

exports.presentation = functions.https.onRequest((req, res) =>
  presentation(req, res, db)
)

exports.removeOldSlides = functions.firestore
  .document('slides/{slideId}')
  .onCreate(event => removeOldSlides(event, db))

exports.updateLastVisit = functions.https.onRequest((req, res) =>
  updateLastVisit(req, res, db)
)
