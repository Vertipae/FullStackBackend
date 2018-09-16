require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url)
// Perustetaan mongoose modeli
const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person