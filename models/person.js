
const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    age: Number,

    favoriteFoods: [String]

})

const Person = mongoose.model("Person", personSchema)