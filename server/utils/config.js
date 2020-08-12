require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let CLIENT_ID = process.env.CLIENT_ID
let CLIENT_SECRET = process.env.CLIENT_SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    CLIENT_ID,
    CLIENT_SECRET
}