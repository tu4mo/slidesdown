module.exports = async (req, res, db) => {
  const { id } = req.query

  try {
    const querySnapshot = await db
      .collection('slides')
      .where('presentationId', '==', id)
      .limit(1)
      .get()

    const firstDocument = querySnapshot.docs[0]

    db.collection('slides')
      .doc(firstDocument.id)
      .update({ visitedAt: new Date() })

    return res.send(firstDocument.data())
  } catch (err) {
    console.error(err)
    return res.sendStatus(404)
  }
}
