const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log(url)
mongoose.connect(url)
// Perustetaan mongoose modeli
const Person = mongoose.model('Person', {
    name: String,
    number: String
})
// Katotaan onko annettu parametrejä (Node 0, mongo.js 1 siksi alkaa 2:lla)
if (process.argv.length > 2) {
    // Luodaan olio annetuista parametreistä
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    // Tallennetaan luotu olio tietokantaan
    person
        .save()
        .then(response => {
            // Tulostetaan konsoliin ja suljetaan yhteys tietokantaan
            console.log(`Lisätään henkilö ${process.argv[2]} numero ${process.argv[3]} luetteloon`)
            mongoose.connection.close()
        })
    // Jos parametrejä ei ole annettu
} else {
    // Mongoose modelin avulla etitään kaikki henkilöt tietokannasta ja tulostetaan ne
    Person
        .find({})
        .then(result => {
            console.log(`Puhelinluettelo:`)
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            // Suljetaan taas
            mongoose.connection.close()
        })
}