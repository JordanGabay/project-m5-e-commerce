const authRouter = require('express').Router()
const config = require('../utils/config')

authRouter.get('/', async (req, res) => {
    res.status(200).json(config.CLIENT_ID)
})

module.exports = authRouter