const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Module = new Schema({
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
        default: 2
    }
})

module.exports = mongoose.model('Module', Module)