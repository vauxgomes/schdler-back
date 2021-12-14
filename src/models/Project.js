const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    credits: {
        type: Number,
        required: true,
        default: 20
    },

    slots: {
        type: Number,
        required: true,
        default: 10
    }
})

module.exports = mongoose.model('Project', Project)
