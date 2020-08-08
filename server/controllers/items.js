const itemsRouter = require('express').Router()
const Item = require('../models/item')
//const itemData = require('../data/items.json')

//BASE URL = http://localhost:4000/api/items

itemsRouter.get('/', async (req, res) => {
    const items = await Item.find({})

    res.status(200).json(items.map(item => item.toJSON()))
})

itemsRouter.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    
    item ? res.status(200).json(item.toJSON()) : res.status(404).end()
})

// to change stock in database, make PUT request to /api/items/:id with request body -- { purchased: numPurchased } -- 
itemsRouter.put('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id)
    const newQuantity = {
        numInStock: item.numInStock - req.body.purchased 
    }

    if (newQuantity.numInStock < 0) {
        res.status(400).json({ error: `insufficient stock`, stock: item.numInStock })
    } else {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, newQuantity, { new: true })

        updatedItem ? res.status(200).json(updatedItem) : res.status(404).end()
    }
})

// SINGLE USE TO POPULATE DATABASE
// itemsRouter.post('/', async (req, res) => {
//     await Promise.all(itemData.map(item => {
//         const modifiedItem = {
//             ...item
//         }
//         delete modifiedItem.id
//         const newItem = new Item({
//             ...modifiedItem
//         })
//         return newItem.save()
//     }))
//     res.status(200).end()
// })

module.exports = itemsRouter