const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

const itemsRouter = require('./controllers/items')
const ordersRouter = require('./controllers/orders')
const mongoose = require('mongoose')

console.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.info('connected to MongoDB')
    })
    .catch((error) => {
        console.info('error connecting to MongoDB:', error)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/items', itemsRouter)
app.use('/api/orders', ordersRouter)

module.exports = app