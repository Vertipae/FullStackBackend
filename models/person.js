require('dotenv').config()

const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.statics.format = function (person) {
    return ({
        name: person.name,
        number: person.number,
        id: person._id
    })
}

const Person = mongoose.model('Person', personSchema)
// Perustetaan mongoose modeli
// const Person = mongoose.model('Person', {
//     name: String,
//     number: String
// })

module.exports = Person