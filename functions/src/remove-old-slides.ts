import * as admin from 'firebase-admin'

const DATE_OFFSET = 1000 * 60 * 60 * 24 * 30
const dateThirtyDaysAgo = new Date()
dateThirtyDaysAgo.setTime(dateThirtyDaysAgo.getTime() - DATE_OFFSET)

const getOldSlides = (db: admin.firestore.Firestore) =>
  db.collection('slides').where('createdAt', '<', dateThirtyDaysAgo).get()

const getImages = (slide: FirebaseFirestore.QueryDocumentSnapshot) =>
  slide.ref.collection('images').get()

// TODO: Remove image from storage
const removeSlide = async (slide: FirebaseFirestore.QueryDocumentSnapshot) => {
  const images = await getImages(slide)
  const imageDeleteBatch: Promise<FirebaseFirestore.WriteResult>[] = []
  images.forEach((image) => imageDeleteBatch.push(image.ref.delete()))
  return Promise.all(imageDeleteBatch).then(() => slide.ref.delete())
}

export default async (db: admin.firestore.Firestore) => {
  const slides = await getOldSlides(db)

  console.log(
    `${slides.size} slides created before ${dateThirtyDaysAgo.toJSON()}`
  )

  slides.forEach(async (slide) => {
    const { visitedAt } = slide.data()

    // Remove when visitedAt is undefined or old
    if (!visitedAt || visitedAt.toDate() < dateThirtyDaysAgo) {
      try {
        await removeSlide(slide)
        console.log(
          `${slide.id}: Removed (last visit: ${
            visitedAt ? visitedAt.toDate().toJSON() : 'unknown'
          })`
        )
      } catch (err) {
        console.error(`${slide.id}: Unable to remove (${err.message})`)
      }
    } else {
      console.log(
        `${slide.id}: Not removing (last visit: ${
          visitedAt ? visitedAt.toDate().toJSON() : 'unknown'
        })`
      )
    }
  })
}
