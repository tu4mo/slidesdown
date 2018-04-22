const DATE_OFFSET = 1000 * 60 * 60 * 24 * 30
const dateThirtyDaysAgo = new Date()
dateThirtyDaysAgo.setTime(dateThirtyDaysAgo.getTime() - DATE_OFFSET)

const getOldSlides = db =>
  db
    .collection('slides')
    .where('createdAt', '<', dateThirtyDaysAgo)
    .get()

const getImages = slide => slide.ref.collection('images').get()

// TODO: Remove image from storage
const removeSlide = slide =>
  getImages(slide).then(images => {
    const imageDeleteBatch = []
    images.forEach(image => imageDeleteBatch.push(image.ref.delete()))
    Promise.all(imageDeleteBatch).then(() => slide.ref.delete())
  })

module.exports = (event, db) =>
  getOldSlides(db).then(slides => {
    console.log(
      `${slides.size} slides created before ${dateThirtyDaysAgo.toJSON()}`
    )

    slides.forEach(slide => {
      const { visitedAt } = slide.data()

      // Remove when visitedAt is undefined or old
      if (!visitedAt || visitedAt < dateThirtyDaysAgo) {
        return removeSlide(slide)
          .then(() => {
            console.log(
              `${slide.id}: Removed (last visit: ${
                visitedAt ? visitedAt.toJSON() : 'unknown'
              })`
            )
          })
          .catch(err =>
            console.error(`${slide.id}: Unable to remove (${err.message})`)
          )
      } else {
        console.log(
          `${slide.id}: Not removing (last visit: ${
            visitedAt ? visitedAt.toJSON() : 'unknown'
          })`
        )
      }
    })
  })
