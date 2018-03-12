import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import uuid from 'uuid/v4'

firebase.initializeApp({
  apiKey: 'AIzaSyDdtbNkoViGcZLJvPMzkLcAVgJtVmOJB_E',
  authDomain: 'slidesdown-2a4ab.firebaseapp.com',
  databaseURL: 'https://slidesdown-2a4ab.firebaseio.com',
  projectId: 'slidesdown-2a4ab',
  storageBucket: 'slidesdown-2a4ab.appspot.com',
  messagingSenderId: '313406118926'
})

const db = firebase.firestore()
const storage = firebase.storage().ref()

const IMAGES_COLLECTION = 'images'
const SLIDES_COLLECTION = 'slides'

export const getSlides = async id => {
  const getDoc = () =>
    db
      .collection(SLIDES_COLLECTION)
      .doc(id)
      .get()

  const updateLastVisit = () =>
    fetch(
      `/api/updateLastVisit?id=${id}`
    )

  const [doc] = await Promise.all([getDoc(), updateLastVisit()])

  return doc.data()
}

export const saveSlides = ({ id, markdown, theme }) =>
  db
    .collection(SLIDES_COLLECTION)
    .doc(id)
    .set({ createdAt: new Date(), markdown, theme })
    .catch(error => {
      console.error('Error adding document: ', error)
    })

export const saveImage = async ({ id, file, onChange, onError, onDone }) => {
  const imagePath = `images/${id}/${uuid()}-${file.name}`

  const uploadTask = storage.child(imagePath).put(file)

  try {
    await db
      .collection(SLIDES_COLLECTION)
      .doc(id)
      .collection(IMAGES_COLLECTION)
      .add({ path: imagePath })
  } catch (err) {
    console.error(err)
  }

  uploadTask.on(
    'state_changed',
    snapshot =>
      onChange(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
      ),
    error => onError(error),
    () => onDone(uploadTask.snapshot)
  )
}
