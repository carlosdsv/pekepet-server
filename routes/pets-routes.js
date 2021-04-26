const express = require('express')
const {
  createEvent,
  createPet,
  getEvents,
  getPets,
} = require('../controllers/petController')
const router = express.Router()

router.post('/create-event', createEvent)
router.post('/create-pet', createPet)
router.post('/get-events', getEvents)
router.post('/get-pets', getPets)

module.exports = router
