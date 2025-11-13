import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage'
import throttle from 'lodash.throttle'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDdtbNkoViGcZLJvPMzkLcAVgJtVmOJB_E',
  authDomain: 'slidesdown-2a4ab.firebaseapp.com',
  databaseURL: 'https://slidesdown-2a4ab.firebaseio.com',
  projectId: 'slidesdown-2a4ab',
  storageBucket: 'slidesdown-2a4ab.appspot.com',
  messagingSenderId: '313406118926',
})

const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const IMAGES_COLLECTION = 'images'
const SLIDES_COLLECTION = 'slides'

type Slide = {
  markdown: string
  presentationId: `${string}-${string}-${string}-${string}-${string}`
}

export const getSlides = async (id: string) => {
  const docSnap = await getDoc(doc(db, SLIDES_COLLECTION, id))

  if (!docSnap.exists()) {
    throw new Error('Slides do not exist')
  }

  return docSnap.data() as Slide
}

export const getPresentation = async (id: string) => {
  const response = await fetch(`/api/onPresentationRequest?id=${id}`)
  const json = await response.json()
  return json
}

export const createSlides = async ({
  id,
  markdown,
  presentationId,
}: {
  id: string
  markdown: string
  presentationId: string
}) => {
  try {
    await setDoc(doc(db, SLIDES_COLLECTION, id), {
      createdAt: serverTimestamp(),
      markdown,
      presentationId,
    })
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}

export const updateSlides = async ({
  id,
  markdown,
  callback,
}: {
  id: string
  markdown: string
  callback(): void
}) => {
  try {
    await updateDoc(doc(db, SLIDES_COLLECTION, id), { markdown })

    callback()
  } catch (error) {
    console.error('Error updating document: ', error)
  }
}

export const updateSlidesThrottled = throttle(updateSlides, 2000)

export const saveImage = async ({
  id,
  file,
  onChange,
  onError,
  onDone,
}: {
  id: string
  file: File
  onChange(progress: number): void
  onError(error: Error): void
  onDone(snapshot: UploadTaskSnapshot): void
}) => {
  const imagePath = `images/${id}/${crypto.randomUUID()}-${file.name}`

  const uploadTask = uploadBytesResumable(ref(storage, imagePath), file)

  try {
    await addDoc(collection(db, SLIDES_COLLECTION, id, IMAGES_COLLECTION), {
      path: imagePath,
    })
  } catch (err) {
    console.error(err)
  }

  uploadTask.on(
    'state_changed',
    (snapshot) =>
      onChange(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      ),
    (error) => onError(error),
    () => onDone(uploadTask.snapshot),
  )
}
