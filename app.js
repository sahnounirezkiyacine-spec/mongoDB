require("dotenv").config()
const mongoose = require("mongoose")

const Person = require("./models/person")

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.log(err))

const person = new Person({
    name: "Yacine",
    age: 99,
    favoriteFoods: ["pizza", "burger"],
})

person.save(function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log("Personne sauvegarder", data)
    }
})

const createPeople = () => {
    const arrayOfPeople = [
        { name: "John", age: 25, favoriteFoods: ["pizza"] },
        { name: "Mary", age: 30, favoriteFoods: ["burger"] },
        { name: "Ahmed", age: 28, favoriteFoods: ["couscous"] }
    ]

    Person.create(arrayOfPeople, (err, data) => {
        if (err) console.log(err)
        else console.log("Personnes créées :", data)
    })

}


const findPeopleByName = (personName) => {

    Person.find({ name: personName }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    })

}


const findOneByFood = (food) => {

    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    })

}

const findPersonById = (personId) => {

    Person.findById(personId, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    })

}



const addHamburger = (personId) => {

    Person.findById(personId, function (err, person) {

        if (err) {
            console.log(err)
        } else {

            person.favoriteFoods.push("hamburger")

            person.save(function (err, updatedPerson) {

                if (err) {
                    console.log(err)
                } else {
                    console.log("Personne mise à jour :", updatedPerson)
                }

            })

        }

    })

}




const updateAge = (personName) => {

    Person.findOneAndUpdate(
        { name: personName },
        { age: 20 },
        { new: true },

        function (err, updatedPerson) {

            if (err) {
                console.log(err)
            } else {
                console.log("Personne mise à jour :", updatedPerson)
            }

        }

    )

}




const deletePersonById = (personId) => {

    Person.findByIdAndRemove(personId, function (err, removedPerson) {

        if (err) {
            console.log(err)
        } else {
            console.log("Personne supprimée :", removedPerson)
        }

    })

}




const deleteMary = () => {

    Person.remove({ name: "Mary" }, function (err, result) {

        if (err) {
            console.log(err)
        } else {
            console.log("Résultat suppression :", result)
        }

    })

}