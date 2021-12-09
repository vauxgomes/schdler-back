const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Board = new Schema({
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

    title: {
        type: String,
        required: true
    },

    period: {
        type: String,
        enum: ['U', 'M', 'A', 'N'],
        required: true,
        default: 'U'
    },

    slots: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Slot'
        }
    ]
})

module.exports = mongoose.model('Board', Board)
