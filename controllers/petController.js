'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()

const createEvent = async (req, res, next) => {
  try {
    const {
      petId,
      eventId,
      upcoming,
      type,
      description,
      date,
      notes,
    } = req.body
    const event = {
      upcoming,
      type,
      description,
      date,
      notes,
    }
    const newEvent = {}
    newEvent[eventId] = event
    const docRef = await firestore.collection('events').doc(petId)
    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({ ...newEvent }, { merge: true })
      } else {
        docRef.set({ ...newEvent })
      }
    })
    res.status(200).send('Event created correctly')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const createPet = async (req, res, next) => {
  try {
    const {
      uid,
      petId,
      name,
      species,
      breed,
      birthDate,
      notes,
      profilePicture,
    } = req.body
    const newPet = {
      petId,
      name,
      species,
      breed,
      birthDate,
      notes,
      profilePicture,
    }
    const docRef = await firestore.collection('pets').doc(uid)
    docRef.get().then((doc) => {
      if (doc.exists) {
        const prevPets = doc.data().pets
        docRef.set({ pets: [...prevPets, newPet] })
      } else {
        docRef.set({ pets: [newPet] })
      }
    })
    res.status(200).send('Pet created correctly')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getEvents = async (req, res, next) => {
  try {
    const { petId } = req.body
    const docRef = await firestore.collection('events').doc(petId)
    docRef.get().then((doc) => {
      if (doc.exists) {
        res.status(200).send(doc.data())
      } else {
        res.status(200).send(null)
      }
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const getPets = async (req, res, next) => {
  try {
    const { uid } = req.body
    const docRef = await firestore.collection('pets').doc(uid)
    docRef.get().then((doc) => {
      if (doc.exists) {
        res.status(200).send(doc.data().pets)
      } else {
        res.status(200).send([])
      }
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const storeImage = async (req, res, next) => {
  try {
    const { file } = req.body

    // Create a storage reference from our storage service
    const storageRef = await firebase.storage().ref('images/' + file.name)
    await storageRef.put(file)

    // Create a reference to 'mountains.jpg'
    const fileRef = await storageRef.child('images/' + file.name)
    const url = await fileRef.getDownloadURL()
    console.log('url')
    console.log(url)
    res.status(200).send(url)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { createEvent, createPet, getEvents, getPets, storeImage }
