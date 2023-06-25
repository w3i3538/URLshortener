const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
const port = 3000

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

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/', (req, res) => {
    if (!req.body.original_url) return res.redirect("/")
    

})

app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`)
})