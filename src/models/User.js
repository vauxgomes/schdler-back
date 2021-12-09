const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },

    pass: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
})

module.exports = mongoose.model('User', User)
