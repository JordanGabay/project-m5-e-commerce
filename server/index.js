const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.info(`Server running on port ${config.PORT}`)
})




// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const items = require('./data/items.json')

// const PORT = 4000;

// express()
//   .use(function(req, res, next) {
//     res.header(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, HEAD, GET, PUT, POST, DELETE'
//     );
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
//   })
//   .use(morgan('tiny'))
//   .use(express.static('./server/assets'))
//   .use(bodyParser.json())
//   .use(express.urlencoded({ extended: false }))
//   .use('/', express.static(__dirname + '/'))

//   // REST endpoints?
//   .get('/items', (req, res) => {
//     res.status(200).json(items)
//   })

//   .get('/items/:id', (req, res) => {
//     const itemId = Number(req.params.id)
//     const item = items.find(i => i.id === itemId)
//     console.log(item)
//     res.status(200).json(item)
//   })

//   .put('/items/:id', (req, res) => {
//     const itemId = Number(req.params.id)
//     const quantityPurchased = req.body.quantity 
//     items.forEach(item => {
//       if (item.id === itemId) {
//         item.numInStock -= quantityPurchased
//         res.status(200).json(item)
//       }
//     })
//   })

//   .listen(PORT, () => console.info(`Listening on port ${PORT}`));
