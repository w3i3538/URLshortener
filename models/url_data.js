const mongoose = require('mongoose')
const Schema = mongoose.Schema
const url_dataSchema = new Schema({
    origin_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('url_data', url_dataSchema)