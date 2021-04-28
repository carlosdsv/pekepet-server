const express = require('express')
const {
  createEvent,
  createPet,
  getEvents,
  getPets,
  storeImage,
} = require('../controllers/petController')
const router = express.Router()

router.post('/create-event', createEvent)
router.post('/create-pet', createPet)
router.post('/get-events', getEvents)
router.post('/get-pets', getPets)
router.post('/store-image', storeImage)

module.exports = router
