const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Block = new mongoose.Schema({
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

    professor: {
        type: Schema.Types.ObjectId,
        ref: 'Professor',
        required: true
    },

    module: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
        required: true
    },

    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
})

module.exports = mongoose.model('Block', Block)
