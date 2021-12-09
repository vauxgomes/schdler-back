const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Professor = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Professor', Professor)
