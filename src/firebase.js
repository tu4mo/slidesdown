import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

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

const SLIDES_COLLECTION = 'slides'
const VISITS_COLLECTION = 'visits'

export const getSlides = async id => {
  const doc = await db
    .collection(SLIDES_COLLECTION)
    .doc(id)
    .get()

  if (doc) {
    await db
      .collection(VISITS_COLLECTION)
      .add({ visitedAt: new Date(), slideId: id })
  }

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

export const saveImage = async ({ id, file }) => {
  const snapshot = await storage.child(`images/${id}/${file.name}`).put(file)
  return snapshot.downloadURL
}
