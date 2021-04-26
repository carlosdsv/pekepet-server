'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()

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

module.exports = { createPet, getPets }
