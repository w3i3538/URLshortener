const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// ok
db.once('open', () => {
    console.log('mongodb connected!')
})
// err
db.on('error', () => {
    console.log('mongodb error!')
})

module.exports = db