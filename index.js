const express = require('express')
const app = express()
const winston = require('winston')

require('./startup/logging')(app)
require('./startup/db')()
require('./startup/routes')(app)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () =>
  winston.info(`Listening on PORT ${PORT}...`)
)

module.exports = server
