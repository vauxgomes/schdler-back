const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Location = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: false,
        default: 30
    }
})

module.exports = mongoose.model('Location', Location)
