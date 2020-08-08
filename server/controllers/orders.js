const ordersRouter = require('express').Router()
const Order = require('../models/order')
const Item = require('../models/item')

ordersRouter.get('/', async (req, res) => {
    const orders = await Order.find({}).populate('order.item', { name: 1, price: 1 })

    res.status(200).json(orders.map(order => order.toJSON()))
})

ordersRouter.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id).populate('order.item', { name: 1, price: 1 })

    order ? res.status(200).json(order.toJSON()) : res.status(404).end()
})

// see orderSchema in models/order.js for proper layout of order object to be sent in request body
ordersRouter.post('/', async (req, res) => {
    const order = new Order({
        ...req.body
    })

    const savedOrder = await order.save()

    res.status(200).json(savedOrder)
})

module.exports = ordersRouter