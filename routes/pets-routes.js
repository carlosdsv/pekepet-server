const express = require('express')
const { createPet, getPets } = require('../controllers/petController')
const router = express.Router()

router.post('/create-pet', createPet)
router.post('/get-pets', getPets)

module.exports = router
