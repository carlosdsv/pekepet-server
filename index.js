'use strict'

const express = require('express')
const cors = require('cors')
const config = require('./config')
const userRoutes = require('./routes/user-routes')
const petsRoutes = require('./routes/pets-routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(userRoutes)
app.use(petsRoutes)

app.listen(process.env.PORT || config.port, () =>
  console.log(`App is listening on url http:localhost:${config.port}`)
)
