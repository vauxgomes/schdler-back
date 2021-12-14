const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Slot = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    board: {
        type: Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },

    index: {
        type: Number,
        required: true,
    },

    block: {
        type: Schema.Types.ObjectId,
        ref: 'Block',
        required: true
    }
})

module.exports = mongoose.model('Slot', Slot)
