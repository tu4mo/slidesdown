const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const DATE_OFFSET = 1000 * 60 * 60 * 24 * 30
const dateThirtyDaysAgo = new Date()
dateThirtyDaysAgo.setTime(dateThirtyDaysAgo.getTime() - DATE_OFFSET)

const getSlides = () =>
  db
    .collection('slides')
    .where('createdAt', '<', dateThirtyDaysAgo)
    .get()

const getHasVisits = slideDoc =>
  db
    .collection('slides')
    .doc(slideDoc.id)
    .collection('visits')
    .limit(1)
    .get()
    .then(visits => {
      return visits.size > 0
    })

const getVisits = slideDoc =>
  db
    .collection('slides')
    .doc(slideDoc.id)
    .collection('visits')
    .where('visitedAt', '<', dateThirtyDaysAgo)
    .orderBy('visitedAt', 'desc')
    .limit(1)
    .get()

const removeSlide = slide =>
  slide.ref.delete().then(() => {
    console.log(`Deleted document ${slide.id}`)
  })

const onCreate = event =>
  getSlides().then(slides => {
    console.log(
      `${slides.size} slides created before ${dateThirtyDaysAgo.toJSON()}`
    )

    slides.forEach(slide => {
      // Remove slides that has no visits
      getHasVisits(slide).then(hasVisits => {
        if (!hasVisits) {
          removeSlide(slide)
        }
      })

      // Remove slides that has no recent visits
      getVisits(slide).then(visits => {
        if (!visits.empty) {
          console.log(
            `Last visit for ${
              slide.id
            } is older than ${dateThirtyDaysAgo.toJSON()}`
          )

          removeSlide(slide)
        }
      })
    })
  })

exports.removeOldSlides = functions.firestore
  .document('slides/{slideId}')
  .onCreate(onCreate)
