import { Firestore } from 'firebase-admin/firestore'

const DATE_OFFSET = 1000 * 60 * 60 * 24 * 30 // 30 days in milliseconds

function getDateThirtyDaysAgo() {
  const date = new Date()
  date.setTime(date.getTime() - DATE_OFFSET)
  return date
}

function getOldSlides(db: Firestore) {
  return db
    .collection('slides')
    .where('createdAt', '<', getDateThirtyDaysAgo())
    .get()
}

function getImages(slide: FirebaseFirestore.QueryDocumentSnapshot) {
  return slide.ref.collection('images').get()
}

// TODO: Remove image from storage
async function removeSlide(slide: FirebaseFirestore.QueryDocumentSnapshot) {
  const images = await getImages(slide)
  const imageDeleteBatch: Promise<FirebaseFirestore.WriteResult>[] = []
  images.forEach((image) => imageDeleteBatch.push(image.ref.delete()))
  return Promise.all(imageDeleteBatch).then(() => slide.ref.delete())
}

export async function removeOldSlides(db: Firestore) {
  const dateThirtyDaysAgo = getDateThirtyDaysAgo()
  const slides = await getOldSlides(db)

  console.log(
    `${slides.size} slides created before ${dateThirtyDaysAgo.toJSON()}`,
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
          })`,
        )
      } catch (err) {
        if (err instanceof Error) {
          console.error(`${slide.id}: Unable to remove (${err.message})`)
        }
      }
    } else {
      console.log(
        `${slide.id}: Not removing (last visit: ${
          visitedAt ? visitedAt.toDate().toJSON() : 'unknown'
        })`,
      )
    }
  })
}
