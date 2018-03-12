const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const removeOldSlides = require('./removeOldSlides')
const updateLastVisit = require('./updateLastVisit')

exports.removeOldSlides = functions.firestore
  .document('slides/{slideId}')
  .onCreate(onCreate => removeOldSlides(onCreate, db))

exports.updateLastVisit = functions.https.onRequest((req, res) =>
  updateLastVisit(req, res, db)
)
