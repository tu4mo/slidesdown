module.exports = (req, res, db) => {
  const { id } = req.query

  db
    .collection('slides')
    .doc(id)
    .update({ visitedAt: new Date() })
    .then(() => {
      console.log(`${id}: visitedAt updated`)
    })
    .catch(() => {
      console.error(`${id}: doesn't exist`)
    })
    .then(() => {
      res.sendStatus(200)
    })
}
