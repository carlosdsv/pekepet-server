'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()

const createPet = async (req, res, next) => {
  try {
    const {
      uid,
      name,
      species,
      breed,
      birthDate,
      notes,
      profilePicture,
    } = req.body
    const pet = {
      name,
      species,
      breed,
      birthDate,
      notes,
      profilePicture,
    }
    const docRef = await firestore.collection('pets').doc(uid)
    docRef.get().then((doc) => {
      const pets = doc.data().pets
      if (doc.exists) {
        docRef.set({ pets: [...pets, pet] })
        res.status(200).send({ pets: [...pets, pet] })
      } else {
        docRef.set({ pets: [pet] })
        res.status(200).send({ pets: [pet] })
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

module.exports = { createPet, getPets }
