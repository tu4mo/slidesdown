import * as firebase from 'firebase'
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

export const getSlides = id =>
  db
    .collection(SLIDES_COLLECTION)
    .doc(id)
    .get()
    .then(doc => doc.data())

export const saveSlides = ({ markdown }) =>
  db
    .collection(SLIDES_COLLECTION)
    .add({ createdAt: new Date(), markdown })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error('Error adding document: ', error)
    })
