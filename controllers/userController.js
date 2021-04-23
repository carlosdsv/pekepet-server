'use strict'

const firebase = require('../db')
const firestore = firebase.firestore()

const createUser = async (req, res, next) => {
  try {
    const { uid, name } = req.body
    await firestore.collection('users').doc(uid).set({ name })
    res.status(500).send('User created correctly')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getUser = async (req, res, next) => {
  try {
    const { uid } = req.body
    const docRef = await firestore.collection('users').doc(uid)
    docRef.get().then((doc) => {
      if (doc.exists) {
        res.status(200).send(doc.data())
      } else {
        console.log('3')
      }
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { createUser, getUser }
