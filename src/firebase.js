import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDdtbNkoViGcZLJvPMzkLcAVgJtVmOJB_E',
  authDomain: 'slidesdown-2a4ab.firebaseapp.com',
  databaseURL: 'https://slidesdown-2a4ab.firebaseio.com',
  projectId: 'slidesdown-2a4ab',
  storageBucket: 'slidesdown-2a4ab.appspot.com',
  messagingSenderId: '313406118926'
})

const db = firebase.firestore()

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

export const saveSlides = ({ markdown }) =>
  db
    .collection(SLIDES_COLLECTION)
    .add({ createdAt: new Date(), markdown })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error('Error adding document: ', error)
    })
